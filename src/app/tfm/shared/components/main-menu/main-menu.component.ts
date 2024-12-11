import { Component, Input, Output } from '@angular/core';
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

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubmenu(selectedCategory: Category) {
    this.activeCategory = this.activeCategory === selectedCategory ? null : selectedCategory;
  }

  isSubmenuActive(category: Category): boolean {
    return this.activeCategory === category;
  }
}
