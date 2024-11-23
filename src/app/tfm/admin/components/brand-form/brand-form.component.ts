import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BrandFormInfo } from '../../models/BrandFormInfo';
import { Brand } from '../../../shared/models/Brand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.sass'
})
export class BrandFormComponent implements OnInit{

  @Input() 
  public formInfo: BrandFormInfo = {
    allCategories:              [],
    allLabels:                  [],
    allConsumers:               [],
    allPrices:                  [],
    allAutonomousCommunities:   [],
    allProvinces:               [],
    allLocations:               []
  };

  @Input()
  public editBrand: Brand | null = null;

  @Output()
  public onSubmit: EventEmitter<Brand> = new EventEmitter<Brand>();

  @Output()
  public onAutonomousCommunityChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onProvinceChange: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.form = new FormGroup({
        name:                   new FormControl('', Validators.required),
        summary:                new FormControl(''),
        url:                    new FormControl(''),
        materials:              new FormControl(''),
        crueltyFree:            new FormControl(null),
        vegan:                  new FormControl(null),
        commitment:             new FormControl(''),
        production:             new FormControl(''),
        categories:             this.fb.array([]),
        labels:                 this.fb.array([]),
        consumers:              this.fb.array([]),
        price:                  new FormControl(1),
        locations:               this.fb.array([])
      }); 
      
      if(this.editBrand!= null){
        this.form.patchValue(this.editBrand); 
        this.editBrand.consumers?.map(consumer => this.consumersArray.push(this.fb.control(consumer)));
        this.editBrand.labels?.map(label => this.labelsArray.push(this.fb.control(label)));
        this.editBrand.categories?.map(category => this.categoriesArray.push(this.fb.control(category)));
        this.editBrand.locations?.map(location => this.locationsArray.push(this.fb.control(location)));
      }
  }

  currentSubcategories: string[] | null = null;
  selectedSubcategories: string[] = [];
  categoryControl = new FormControl('');
  subcategoryControl = new FormControl<string[]>([]);

  autonomousCommunityControl = new FormControl('');
  provinceControl = new FormControl('');
  locationControl = new FormControl('');
  filteredLocations: string[] = [];

  //label
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

  //Consumer
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
    return this.form.get('locations') as FormArray;
  }

  autonomousCommunityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const communityName = selectElement.value;
    this.onAutonomousCommunityChange.emit(communityName);

    this.provinceControl.reset(); 
  }

  provinceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const provinceName = selectElement.value;
    this.onProvinceChange.emit(provinceName);
  }

  onLocationInput(): void {
    const inputValue = this.locationControl.value!.toLowerCase();
    this.filteredLocations = this.formInfo.allLocations.filter(location => 
      location.toLowerCase().includes(inputValue)
    );
  }

  addLocation(location: string): void {
    const community = this.autonomousCommunityControl.value;
    const province = this.provinceControl.value;

    this.filteredLocations =[];

    if (!location || !province)  return;
    
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

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
