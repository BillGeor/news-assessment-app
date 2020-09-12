import { NewsService } from './news.service';
import { Article } from './../shared/news.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  // Article Data
  articleList : Article[] = [];
  articleSub: Subscription;
  lengthSub: Subscription;

  // Article Paginator data
  listLength: number = 100;
  pageIndex: number = 0;
  pageSize: number = 6;

  
  constructor(
    private newsService: NewsService 
  ) { }

  ngOnInit(): void {
    this.getArticles();
    
    this.articleSub = this.newsService.articlesChanged
      .subscribe(
        (articles: Article[]) => {
          this.articleList = articles;
        }
      );
    this.lengthSub = this.newsService.totalResults
      .subscribe(
        (queryLength) => {
          this.listLength = queryLength;
        }
      )
  }

  getArticles(
    pageIndex: number = 0
  ) {
    this.newsService.fetchArticles(pageIndex).subscribe();
    this.articleList = this.newsService.getArticles();
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.getArticles(event.pageIndex);
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.lengthSub.unsubscribe();
  }
}
