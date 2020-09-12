import { NewsService } from './../../news.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  searchValue = new FormControl('');

  constructor(
    private newsService: NewsService,
  ) {}

  ngOnInit() {
    this.onChange();
  }

  clearSearch() {
    this.searchValue.reset();
  }

  onChange() {
    this.searchValue.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        (val) => {
          this.newsService.search(val)
        }
      )
  }
}