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
      consumers: this.fb.group(
        this.consumers.reduce((acc, consumer) => {
          acc[consumer] = false;
          return acc;
        }, {})
      ),
      price: new FormControl(1),
      location: this.fb.array([])
    });
  }

  /*BORRAR*/
  //Se recogeran de la base de datos
  categories: Category[]= [
    {name:"ropa", subcategories:["Deporte", "Casual", "De Noche"]},
    {name:"calzado", subcategories:["Zapatillas", "Botas", "Sandalias"]},
    {name:"electronica", subcategories:["Televisores", "Laptops"]}
  ];

  /*BORRAR*/ 
  // Se recogeran de la base de datos
  labels: string[] = ["nuevo", "viejo", "oferta", "otro"];
  consumers: string[] = ["hombre", "mujer"];
  prices: string[] = ["1", "2", "3"];
  autonomousCommunities: string[] = ['Aragon', 'Madrid', 'Catalunya'];
  provincesByCommunity = {
    'Aragon': ['Zaragoza', 'Huesca', 'Teruel'],
    'Madrid': ['Madrid'],
    'Catalunya': ['Barcelona', 'Girona', 'Tarragona']
  };

  //-------//
  currentSubcategories: string[] | null = null;
  selectedSubcategories: string[] = [];

  categoryControl = new FormControl('');
  subcategoryControl = new FormControl([]);
  //-------//
  autonomousCommunityControl = new FormControl('');
  provinceControl = new FormControl('');
  locationControl = new FormControl('');

  currentProvinces: string[] = [];
  locations: string[] = [];
  //-------//

  //Categories and subcategories
  get categoriesArray(): FormArray {
    return this.form.get('categories') as FormArray;
  }

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
      this.selectedSubcategories.push(value);
    } else {
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (subcat) => subcat !== value
      );
    }
  }

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

    this.categoryControl.reset();
    this.subcategoryControl.reset();
    this.currentSubcategories = null;
  }
  
  removeCategory(index: number): void {
    this.categoriesArray.removeAt(index);
  }


  //Locations

  get locationsArray(): FormArray {
    return this.form.get('location') as FormArray;
  }

  onAutonomousCommunityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const communityName = selectElement.value;
    this.currentProvinces = this.provincesByCommunity[communityName] || [];
    this.provinceControl.reset(); 
  }

  onProvinceChange(event: Event): void {
  }

  addLocation(): void {
    const location = this.locationControl.value;
    const community = this.autonomousCommunityControl.value;
    const province = this.provinceControl.value;

    if (!location || !community || !province)  return;
    
    const locationData = {
      name: location,
      province: province,
      autonomousCommunity: community
    };

    const locationExists = this.locationsArray.controls.some(control => control.value.name === location);

    if (!locationExists) {
      this.locationsArray.push(this.fb.group(locationData));
    }
    
    this.locationControl.reset();
  }

  removeLocation(index: number): void {
    this.locationsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
