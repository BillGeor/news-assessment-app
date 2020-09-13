import { NewsService } from './news.service';
import { Article } from '../shared/helperInterfaces/news.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ServiceResponse } from '../shared/helperInterfaces/service-response.model';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-news',
  providers:  [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  // Service and data control vars
  isLoading: boolean = true;
  articleList : Article[] = [];
  articleSub: Subscription;
  loadingSub: Subscription;
  searchSub: Subscription;
  error: string = null;
  category: string = null;
  filter: string = null;

  // Article Paginator control data
  listLength: number = 0;
  pageIndex: number = 1;
  pageSize: number = 6;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
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
    this.searchSub = this.newsService.newSearch
      .subscribe(
        (search: string) => {
          console.log(search)
          this.filter = search;
          this.router.navigate(
            [`../../../${1}/${this.category}/${this.filter}`], {relativeTo: this.route}
          );
          
        }
      )
    this.loadingSub = this.newsService.loading
      .subscribe(
        (loading:boolean) => {
          this.isLoading = loading;
        }
      )
    this.route.paramMap.subscribe(params => { 
      console.log(params)
      this.pageIndex = (+(params.get('page'))); 
      this.category = params.get('category'); 
      this.filter = params.get('filter'); 
    });

    this.newsService.initArticles(
      this.pageIndex,
      this.category,
      this.filter
    );
  }


  onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.pageIndex = event.pageIndex
    this.newsService.changePage(this.pageIndex + 1);
    this.router.navigate([`../../../${this.pageIndex + 1}/${this.category}/${this.filter}`], {relativeTo: this.route});
  }

  onCategoryChange(event) {
    this.isLoading = true;
    this.category = event ? event : "none";
    this.router.navigate([`../../../${1}/${this.category}/${this.filter}`], {relativeTo: this.route});
    this.newsService.changeCategory(event);
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.loadingSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  onHandleError() {
    if (this.error === "No results match your search!") {
      this.newsService.initArticles();
    }
    this.error = null;
  }
}
