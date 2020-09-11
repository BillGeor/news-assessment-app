import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
   
  }

  onEditItem() {
  }

  ngOnDestroy() {
  }
}
