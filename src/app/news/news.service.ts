import { ServiceResponse } from './../shared/helperInterfaces/service-response.model';
import { ApiRes } from './../shared/helperInterfaces/apiRes.model';
import { environment } from './../../environments/environment';
import { Subject, Subscription, Observable } from 'rxjs';
import { Article } from '../shared/helperInterfaces/news.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiArticle } from './../shared/helperInterfaces/apiArticle.model';



@Injectable({providedIn: 'root'})
export class NewsService {
    private articles: Article[] = [];
    error: string = null;
    totalResults: number;
    articlesChanged = new Subject<ServiceResponse>();
    loading = new Subject<boolean>();
    filter: string = "all";

    constructor(
        private http: HttpClient, 
    ) {}

    fetchArticles(
        pageNum: number,
        fetchFilter: string = this.filter
    ) {
        pageNum++;
        // pageNum = 40;
        this.filter = fetchFilter ? fetchFilter : "all";
        this.loading.next(true);
        this.http.get<ApiRes>(
            `https://newsapi.org/v2/everything?q=${this.filter}&pageSize=6&page=${pageNum}&apiKey=${environment.newsAPIkey}`
        ).pipe(
            tap(    // Update number of results
                (response: ApiRes) => {
                    this.totalResults = response.totalResults;
                }
            ),
            map(    // Convert response to desired form
                (response: ApiRes) => {
                    return(response.articles);
                }
            )
        )
        .subscribe(
            (resdata: ApiArticle[]) => {
                this.clearArticles();
                for (let article of resdata) {
                    this.articles.push(
                        new Article(
                            article.title,
                            article.description,
                            article.urlToImage,
                            "general"
                        )
                    );
                }
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
        this.loading.next(false);
    }
    /**
     * Only gets a copy, not the reference of the articles array
     */
    getArticles() {
        return this.articles.slice();
    }

    search(searchTerm) {
        this.fetchArticles(
            1,
            searchTerm
        )
    }

    private clearArticles() {
        this.articles = [];
    }
}