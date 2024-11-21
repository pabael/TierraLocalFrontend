import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '../../models/brand';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.sass'
})
export class BrandFormComponent {

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

  showSubcategories: boolean = false;

  showSubcategoriesFunc(): void {
    const category = (document.getElementById('category') as HTMLSelectElement).value;
    
    this.selectedCategory = category;
    this.showSubcategories = category ? true : false;
    
    this.selectedSubcategories = {};
  }

  addCategory(): void {

    if(this.selectedCategory == "") return;

    const selectedList = document.getElementById('selectedList') as HTMLElement;
    selectedList.innerHTML = "";

    this.categoriesAndSubcategoriesAdded[this.selectedCategory] = Object.keys(this.selectedSubcategories).filter(subcategory => this.selectedSubcategories[subcategory]);
    
    Object.entries(this.categoriesAndSubcategoriesAdded).forEach(([category, subcategories]) => {
      
      const li = document.createElement('li');
      
      if (subcategories.length > 0) {
        li.textContent = `Categoría: ${category} - Subcategorías: ${subcategories.join(', ')}`;
      } else {
        li.textContent = `Categoría: ${category} - Sin subcategorías seleccionadas.`;
      }
      
      selectedList.appendChild(li);
    });
  }

}
