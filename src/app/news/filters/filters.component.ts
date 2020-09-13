import { Subscription } from 'rxjs';
import { NewsService } from './../news.service';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Source } from 'src/app/shared/helperInterfaces/source.model';

interface Category {
  name: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  categorySelected = new FormControl('');
  @Output() categoryChanged: EventEmitter<string> = new EventEmitter<string>()
  categories: Category[] = [];
  categorySub: Subscription;
  currentVal: string = "";

  
  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.categorySub = this.newsService.categoriesChanged
      .subscribe(
        (response: string[]) => {
          // response mapping
          response.map(
            (category: string) => {
              category = category.charAt(0).toUpperCase() + category.slice(1);
              this.categories.push({name: category})
            }
          )
        }
      );
      this.newsService.fetchCategories()

    this.categorySelected.valueChanges
    .subscribe(
      (val: string) => {
        if (val === undefined && this.currentVal === "") {
          return
        }
        this.categoryChanged.emit(val)
        this.currentVal = val ? val : "";
      }
    )
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

}