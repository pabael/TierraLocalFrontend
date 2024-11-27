import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filters } from '../../../shared/models/Filters';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.sass'
})
export class FiltersComponent implements OnInit {
  @Input()
  filters: Filters = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  @Output()
  public onAutonomousCommunityChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onProvinceChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder){}

  isVegan: boolean = false;
  isCrueltyFree: boolean = false;

  filteredSubcategories: string[] = [];

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = new FormGroup({
      isCrueltyFree:            new FormControl(null),
      isVegan:                  new FormControl(null),
      categories:             new FormControl(null),
      labels:                 this.fb.array([]),
      consumer:              new FormControl(null),
      price:                  new FormControl(1),
      autonomousCommunity:  new FormControl(null),
      province:              new FormControl(null),
      location:              new FormControl(null)
    }); 
  }

  loadSubcategories() {
    const selectedCategory = this.form.get('categories')?.value;

    this.filteredSubcategories = [];

    const selectedCategoryObj = this.filters.allCategories.find(
      category => category.name === selectedCategory
    );

    if (selectedCategoryObj && selectedCategoryObj.subcategories) {
      this.filteredSubcategories = selectedCategoryObj.subcategories;
    }
  }

    //label
    get labelsArray(): FormArray {
      return this.form.get('labels') as FormArray;
    }  
    
    onLabelChange(event: Event, label: string): void {
      const checkbox = event.target as HTMLInputElement;
    
      if (checkbox.checked) {
        this.labelsArray.push(this.fb.control(label));
      } else {
        const existingIndex = this.labelsArray.controls.findIndex((control) => {
          return control?.value === label;
        });
    
        if (existingIndex !== -1) {
          this.labelsArray.removeAt(existingIndex);
        }
      }
    }
  
    autonomousCommunityChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      const communityName = selectElement.value;
      this.onAutonomousCommunityChange.emit(communityName);
  
      this.form.get('province')?.reset(); 
    }
  
    provinceChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      const provinceName = selectElement.value;
      this.onProvinceChange.emit(provinceName);
    }
}
