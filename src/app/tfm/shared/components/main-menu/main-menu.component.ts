import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.sass'
})
export class MainMenuComponent {

  @Input()
  categories: Category[] = [];
  activeCategory: Category | null = null;

  @Output()
  public onCategoryClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onSubcategoryClicked: EventEmitter<{category: string, subcategory: string}> = new EventEmitter<{category: string, subcategory: string}>();

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  isSubmenuActive(category: Category): boolean {
    return this.activeCategory === category;
  }

  categoryClicked(category: string){
    this.onCategoryClicked.emit(category);
  }

  subcategoryClicked(category: string, subcategory: string){
    this.onSubcategoryClicked.emit({category, subcategory});
  }
}
