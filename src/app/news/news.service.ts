import { Source } from './../shared/helperInterfaces/source.model';
import { SourcesResponse } from './../shared/helperInterfaces/sources-api.model';
import { ServiceResponse } from './../shared/helperInterfaces/service-response.model';
import { ApiResponse } from '../shared/helperInterfaces/everything-api.model';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Article } from '../shared/helperInterfaces/news.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ApiArticle } from './../shared/helperInterfaces/apiArticle.model';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({providedIn: 'root'})
export class NewsService {

    private articles: Article[] = [];
    categories: string[] = [];
    sourceCategories: { name: string, sources: Source[] }[] = [];

    error: string;
    totalResults: number;
    filter: string;
    categorySelected: string;
    pageIndex: number;
    endpoint: string;

    articlesChanged = new Subject<ServiceResponse>();
    loading = new Subject<boolean>();
    categoriesChanged = new Subject<string[]>();
    newSearch = new Subject<string>();


    constructor(
        private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute,

    ) {}

    private fetchArticles() {
        if (!this.categorySelected) {
            this.endpoint = "everything";
        } else {
            this.endpoint = "top-headlines";
        }
        this.categorySelected = 
            this.categorySelected ? this.categorySelected : "" 
        this.endpoint = this.endpoint ? this.endpoint : "everything";
        const builtResponse: string = `https://newsapi.org/v2/${this.endpoint}?q=${this.filter}${this.categorySelected}&pageSize=6&page=${this.pageIndex}&apiKey=${environment.newsAPIkey}`

        this.http.get<ApiResponse>(builtResponse)
        .pipe(
            tap(    // Update number of results
                (response: ApiResponse) => {
                    if (response.totalResults === 0) {
                        this.error = "No results match your search!"
                    }
                    this.totalResults = response.totalResults;
                }
                
            ),
            map(    // Convert response to desired form
                (response: ApiResponse) => {
                    return(response.articles);
                }
            ),
            tap(
                (response: ApiArticle[]) => {
                    this.clearArticles();
                    for (let article of response) {
                        this.articles.push(
                            new Article(
                                article.title,
                                article.description,
                                article.urlToImage,
                                "general"
                            )
                        );
                    }
                }
            )
        )
        .subscribe(
            () => {
                this.articlesChanged.next(
                    {
                        totalResults: this.totalResults,
                        articles: this.articles,
                        error: this.error
                    }
                );
            },
            (errorData) => {
                this.error = errorData.error.message;
                this.articlesChanged.next(
                    {
                        totalResults: this.totalResults,
                        articles: this.articles,
                        error: this.error
                    }
                );
            }
         );
    }
    
    fetchCategories () {
        this.http.get<SourcesResponse>(
            `https://newsapi.org/v2/sources?apiKey=${environment.newsAPIkey}`
        )
        .pipe(
            map(    // Convert response to desired form
                (response: SourcesResponse) => {
                    return(response.sources);
                }
            ),
            tap(    
                (response: Source[]) => {
                    for (let source of response) {
                        // Set up Categories array
                        if (!this.categories.includes(source.category)) {
                            this.categories.push(source.category);
                            this.sourceCategories.push({ name: source.category, sources: [] })
                        }
                        // Reverse map response from source->category to category->source
                        this.sourceCategories[
                            this.sourceCategories.findIndex(
                                (cat) => {
                                    if (cat.name == source.category) {
                                        return true;
                                    }
                                    return false;
                                }
                            )
                        ].sources.push(source)
                    }
                }
            )
        )
        .subscribe(
            (response) => {
                this.categoriesChanged.next(
                    this.categories
                )
            },
            (errorData) => {
                this.error = errorData.error.message;
                this.articlesChanged.next(
                    {
                        totalResults: this.totalResults,
                        articles: this.articles,
                        error: this.error
                    }
                );
            }
        )
    }

    /**
     * Helper/setup methods
     */
    getArticles() {
        return this.articles.slice();
    }

    // for news HandleErro use unly
    identicalFetch() {
        this.filter = "all";
        this.fetchArticles();
    }

    initArticles(
        page: number = 1,
        category: string = "",
        filter: string = "all",
        ) {
        this.error = null
        this.pageIndex = page;
        this.filter = filter;
        console.log(category);
        this.categorySelected = (category) ?
        (
            + category.charAt(0).toLowerCase() 
            + category.slice(1)
        ) : "";
        this.categorySelected = ""
        this.fetchArticles();
        this.router.navigate(
            [`../../../${1}/${category}/${filter}`], {relativeTo: this.route}
        )
    }

    changePage(index: number) {
        this.pageIndex = index + 1;
        this.fetchArticles();
    }

    search(searchTerm: string) {
        this.pageIndex = 1;
        this.filter = searchTerm ? searchTerm : "all";
        this.loading.next(true);
        this.newSearch.next(this.filter);
        this.fetchArticles();
    }

    changeCategory(category: string) {
        this.pageIndex = 1;
        this.categorySelected = (category) ?
        (
            "&category=" 
            + category.charAt(0).toLowerCase() 
            + category.slice(1)
        ) : "";
        this.fetchArticles();
    }

    private clearArticles() {
        this.articles = [];
    }
}