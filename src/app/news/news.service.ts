import { environment } from './../../environments/environment';
import { Subject, Subscription, Observable } from 'rxjs';
import { Article } from './../shared/news.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

interface ApiRes {
    status: string;
    totalResults: number;
    articles: ApiArticle[]
}

interface ApiArticle {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    source: { id: string, name: string }
    title: string,
    url: string, 
    urlToImage: string
}

@Injectable({providedIn: 'root'})
export class NewsService {
    private articles: Article[] = [];
    apiSub: Observable<ApiRes>;
    fetchFilter: string = "all";
    
    totalResults = new Subject<number>();
    articlesChanged = new Subject<Article[]>();


    constructor(
        private http: HttpClient, 
    ) {}


    fetchArticles(
        pageNum: number
    ) {
        pageNum++;
        return this.http.get<ApiRes>(
            `https://newsapi.org/v2/everything?q=${this.fetchFilter}&pageSize=6&page=${pageNum}&apiKey=${environment.newsAPIkey}`
        ).pipe(
            // catchError(
            //     error => {
            //         console.log(error)
            //     }
            // ),
            tap(    // Update number of results
                (response: ApiRes) => {
                    this.totalResults.next(response.totalResults);
                }
            ),
            map(    // Convert response to desired form
                (response: ApiRes) => {
                    return(response.articles);
                }
            ),
            tap(    // Reset and populate article array 
                (articles: ApiArticle[]) => {
                    this.clearArticles();
                    for (let article of articles) {
                        this.articles.push(
                            new Article(
                                article.title,
                                article.description,
                                article.urlToImage,
                                "general"
                            )
                        )
                    }
                    this.articlesChanged.next(this.articles);
                }
            )
        )
    }

    /**
     * Only gets a copy, not the reference of the articles array
     */
    getArticles() {
        return this.articles.slice();
    }


    private clearArticles() {
        this.articles = [];
    }
}