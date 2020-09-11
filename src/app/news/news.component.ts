import { NewsService } from './news.service';
import { Article } from './../shared/news.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  articleList : Article[] = [];
  articleSub: Subscription;


  constructor(
    private newsService: NewsService 
  ) { }

  ngOnInit(): void {
    this.articleList = this.newsService.getArticles();
    this.articleSub = this.newsService.articlesChanged
      .subscribe(
        (articles: Article[]) => {
          this.articleList = articles;
        }
      );
  }

  onEditItem() {
  }

  ngOnDestroy() {
  }
}
