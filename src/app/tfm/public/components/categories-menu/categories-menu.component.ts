import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryIcons } from '../../models/CategoryIcons';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.sass'
})
export class CategoriesMenuComponent {

  @Input()
  categories: string[] = [];

  @Output()
  public onCategoryClicked: EventEmitter<string> = new EventEmitter<string>();


  categoryClicked(category: string){
    this.onCategoryClicked.emit(category);
  }

  getIconForCategory(category: string): string {
    return CategoryIcons[category as keyof typeof CategoryIcons] || 'fa-brands fa-shopify';
  }
}
