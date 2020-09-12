import { NewsService } from './news.service';
import { Article } from '../shared/helperInterfaces/news.model';
import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { ServiceResponse } from '../shared/helperInterfaces/service-response.model';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  // Service and data control vars
  isLoading: boolean = true;
  articleList : Article[] = [];
  articleSub: Subscription;
  error: string = null;

  // Article Paginator control data
  listLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 6;

  
  constructor(
    private newsService: NewsService,
    private factoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.articleSub = this.newsService.articlesChanged
      .subscribe(
        (response: ServiceResponse) => {  
          // response mapping
          this.articleList = response.articles; 
          this.listLength = response.totalResults; 
          this.error = response.error;
        
          // loading handler
          this.isLoading = false;
        }
      );
      this.getArticles();
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.getArticles(event.pageIndex);
    this.pageIndex++
  }

  getArticles(
    pageIndex: number = 0
  ) {
    this.newsService.fetchArticles(pageIndex)
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
