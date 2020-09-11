import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

interface Category {
  name: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  animalControl = new FormControl('');
  selectFormControl = new FormControl('');
  categories: Category[] = [
    {name: 'Dog'},
    {name: 'Cat'},
    {name: 'Cow'},
    {name: 'Fox'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}