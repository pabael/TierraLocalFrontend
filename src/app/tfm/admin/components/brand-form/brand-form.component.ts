import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Brand } from '../../models/Brand';
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

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name:                   new FormControl('', Validators.required),
      summary:                new FormControl(''),
      url:                    new FormControl(''),
      materials:              new FormControl(''),
      crueltyFree:            new FormControl('null'),
      vegan:                  new FormControl('null'),
      commitment:             new FormControl(''),
      production:             new FormControl(''),
      categories: this.fb.array([]),
      labels: this.fb.group(
        this.labels.reduce((acc, label) => {
          acc[label] = false;
          return acc;
        }, {})
      ),
      consumers: new FormArray([]),
      price: new FormControl(1),
      autonomousCommunity: new FormControl(''),
      province: new FormControl(''),
      location: new FormControl('')
    });
  }

  /*BORRAR*/
  //Se recogeran de la base de datos
  categories: Category[]= [
    {name:"ropa", subcategories:["Deporte", "Casual", "De Noche"]},
    {name:"calzado", subcategories:["Zapatillas", "Botas", "Sandalias"]},
    {name:"electronica", subcategories:["Televisores", "Laptops"]}
  ];

  currentSubcategories: string[] | null = null;
  selectedSubcategories: string[] = [];

  categoryControl = new FormControl('');
  subcategoryControl = new FormControl([]);

  /*BORRAR*/ 
  // Se recogeran de la base de datos
  labels: string[] = ["nuevo", "viejo", "oferta", "otro"];
  consumers: string[] = ["hombre", "mujer"];
  prices: string[] = ["1", "2", "3"];
  autonomousCommunities: string[] = ["Aragon", "Madrid"];
  provinces: string[] = ["Zaragoza", "Huesca"];

   
  // Getter para el FormArray de categorías
  get categoriesArray(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  // Cambio de categoría seleccionada
  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryName = selectElement.value;
  
    const selectedCategory = this.categories.find((cat) => cat.name === categoryName);
    this.currentSubcategories = selectedCategory?.subcategories || null;
    this.subcategoryControl.reset(); 
  }

  onSubcategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
  
    if (checkbox.checked) {
      // Agregar subcategoría seleccionada
      this.selectedSubcategories.push(value);
    } else {
      // Remover subcategoría deseleccionada
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (subcat) => subcat !== value
      );
    }
  }

  // Añadir categoría y subcategorías seleccionadas al FormArray
  addCategory(): void {
    const selectedCategory = this.categoryControl.value;

    if (!selectedCategory) return;

    const categoryData = {
      name: [selectedCategory, Validators.required],
      subcategories: [this.selectedSubcategories || []]
    };

    this.selectedSubcategories = [];

    const existingIndex = this.categoriesArray.controls.findIndex((control) => {
      return control.get('name')?.value === selectedCategory;
    });

    if (existingIndex !== -1) {
      this.removeCategory(existingIndex);
    }

    this.categoriesArray.push(this.fb.group(categoryData));

    // Reiniciar controles después de añadir
    this.categoryControl.reset();
    this.subcategoryControl.reset();
    this.currentSubcategories = null;
  }

  // Eliminar categoría del FormArray
  removeCategory(index: number): void {
    this.categoriesArray.removeAt(index);
  }

  // Manejo del submit
  onSubmit(): void {
    console.log(this.form.value);

    // if (this.form.valid) {
    //   console.log(this.form.value);
    // }
  }

  // getSelectedLabels(): string[] {
  //   const labelsGroup = this.productForm.get('labels')?.value || {};
  //   return Object.keys(labelsGroup).filter(label => labelsGroup[label]);
  // }

}
