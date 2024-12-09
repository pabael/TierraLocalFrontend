import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.sass'
})
export class CategoriesMenuComponent {

  @Input()
  categories: string[] = [];

  
}
