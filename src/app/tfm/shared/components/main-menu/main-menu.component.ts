import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/Category';
import { ActivatedRoute, Router } from '@angular/router';

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
  public onOtherClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onCategoryClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onSubcategoryClicked: EventEmitter<{category: string, subcategory: string}> = new EventEmitter<{category: string, subcategory: string}>();

  menuOpen = false;

  currentRoute: string = '';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubmenu(category: Category): void {
    this.activeCategory = this.isSubmenuActive(category) ? null : category;
  }

  isSubmenuActive(category: Category): boolean {
    return this.activeCategory === category;
  }

  otherClicked(page: string){
    this.closeMenu();
    this.onOtherClicked.emit(page);
  }

  categoryClicked(category: string){
    this.closeMenu();
    this.onCategoryClicked.emit(category);
  }

  subcategoryClicked(category: string, subcategory: string){
    this.closeMenu();
    this.onSubcategoryClicked.emit({category, subcategory});
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
