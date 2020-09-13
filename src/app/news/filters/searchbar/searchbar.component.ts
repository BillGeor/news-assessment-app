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
    this.searchValue.valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(
        (val) => {
          this.newsService.search(val)
        }
      )
  }

  clearSearch() {
    this.searchValue.reset();
  }
}