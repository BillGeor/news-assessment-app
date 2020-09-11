import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user = {
    firstName: "John",
    lastName: "Doe"
  }
  
  constructor() {}
}

