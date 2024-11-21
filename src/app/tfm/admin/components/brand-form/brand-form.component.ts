import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '../../models/brand';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.sass'
})
export class BrandFormComponent {

  @Input() public brand: Brand = {
    name:        null,
    summary:     null,
    url:         null,
    materials:   null,
    crueltyFree: null,
    vegan:       null,
    commitment:  null,
    production:  null,
    categories:  null,
    labels:      null,
    consumers:   null,
    price:       1,
    locations:   null
  };

  @Output()
  //Envio selectedSubcategories
  public onAddCategory: EventEmitter<{ subcategories: { [key: string]: boolean }, category: string }> = new EventEmitter();


  /*BORRAR*/
  //Se recogeran de la base de datos
  subcategoriesForCategory: { [key: string]: string[] } = {
    ropa: ["Deporte", "Casual", "De Noche"],
    calzado: ["Zapatillas", "Botas", "Sandalias"],
    electronica: ["Televisores", "Laptops", "Smartphones"]
  };

  /*BORRAR*/ 
  // Se recogeran de la base de datos
  categories: string[] = Object.keys(this.subcategoriesForCategory);

  selectedCategory: string = '';
  selectedSubcategories: { [key: string]: boolean } = {};

  categoriesAndSubcategoriesAdded: { [category: string]: string[] } = {};
  addedList: String[] = [];

  addCategory(): void {
    if(this.selectedCategory == "") return;
    this.addedList = [];
    this.categoriesAndSubcategoriesAdded[this.selectedCategory] = Object.keys(this.selectedSubcategories).filter(subcategory => this.selectedSubcategories[subcategory]);
    Object.entries(this.categoriesAndSubcategoriesAdded).forEach(([category, subcategories]) => {
      if (subcategories.length > 0) {
        this.addedList.push(`Categoría: ${category} - Subcategorías: ${subcategories.join(', ')}`);
      } else {
        this.addedList.push(`Categoría: ${category}`);
      }
    });
  }

  deleteCategoriesSelected(): void {
    this.categoriesAndSubcategoriesAdded= {};
    this.addedList = [];
  }

}
