import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Brand } from '../../models/Brand';
import { Category } from '../../models/Category';
import { BrandFormInfo } from '../../models/BrandFormInfo';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.sass'
})
export class BrandFormComponent implements OnInit{

  @Input() public formInfo: BrandFormInfo = {
    allCategories:              [],
    allLabels:                  [],
    allConsumers:               [],
    allPrices:                  [],
    allAutonomousCommunities:   [],
    allProvinces:               [],
    allLocations:               []
  };

  @Output()
  public onAutonomousCommunityChange: EventEmitter<string> = new EventEmitter<string>();

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
        categories:             this.fb.array([]),
        labels:                 this.fb.array([]),
        consumers:              this.fb.array([]),
        price:                  new FormControl(1),
        location:               this.fb.array([])
      });    
  }

  currentSubcategories: string[] | null = null;
  selectedSubcategories: string[] = [];

  categoryControl = new FormControl('');
  subcategoryControl = new FormControl([]);
  autonomousCommunityControl = new FormControl('');
  provinceControl = new FormControl('');
  locationControl = new FormControl('');

  currentProvinces: string[] = [];
  locations: string[] = [];

  // //LABEL
  get labelsArray(): FormArray {
    return this.form.get('labels') as FormArray;
  }  
  
  onLabelChange(event: Event, label: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.labelsArray.push(this.fb.control(label));

    } else {
      const existingIndex = this.labelsArray.controls.findIndex((control) => {
        return control?.value === value;
      });
      this.labelsArray.removeAt(existingIndex);
    }
  }

  //CONSUMER
  get consumersArray(): FormArray {
    return this.form.get('consumers') as FormArray;
  }  
  
  onConsumerChange(event: Event, consumer: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.consumersArray.push(this.fb.control(consumer));

    } else {
      const existingIndex = this.consumersArray.controls.findIndex((control) => {
        return control?.value === value;
      });
      this.consumersArray.removeAt(existingIndex);
    }

  }

  //Categories and subcategories
  get categoriesArray(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryName = selectElement.value;
  
    const selectedCategory = this.formInfo.allCategories.find((cat) => cat.name === categoryName);
    this.currentSubcategories = selectedCategory?.subcategories || null;
    this.subcategoryControl.reset(); 
  }

  onSubcategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
  
    if (checkbox.checked) {
      this.selectedSubcategories.push();
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

  autonomousCommunityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const communityName = selectElement.value;
    this.currentProvinces = this.formInfo.allProvinces || [];
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
