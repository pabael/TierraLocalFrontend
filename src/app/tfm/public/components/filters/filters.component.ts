import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../../../shared/models/Data';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.sass'
})
export class FiltersComponent implements OnInit {
  @Input()
  filters: Data = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  @Output()
  public onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder){}

  isVegan: boolean = false;
  isCrueltyFree: boolean = false;

  filteredSubcategories: string[] = [];

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = new FormGroup({
      isCrueltyFree:            new FormControl(null),
      isVegan:                  new FormControl(null),
      category:             new FormControl("TODAS"),
      subcategory:             new FormControl(null),
      labels:                 this.fb.array([]),
      consumer:              new FormControl("TODAS"),
      price:                  new FormControl("0"),
      autonomousCommunity:  new FormControl("TODAS"),
      province:              new FormControl("TODAS"),
      location:              new FormControl("TODAS")
    }); 
  }

  loadSubcategories() {
    const selectedCategory = this.form.get('category')?.value;

    this.filteredSubcategories = [];

    const selectedCategoryObj = this.filters.allCategories.find(
      category => category.name === selectedCategory
    );

    if (selectedCategoryObj && selectedCategoryObj.subcategories) {
      this.filteredSubcategories = selectedCategoryObj.subcategories;
      this.form.get("subcategory")?.setValue("TODAS");
    }

    this.filterChange();
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

      this.filterChange();
    }

    filterChange(): void {
      const filteredFormValue = Object.fromEntries(
        Object.entries(this.form.value)
          .filter(([_, value]) => value !== null && value !== '' && value !== undefined && (!Array.isArray(value) || value.length > 0) && value !== "0" && value != "TODAS")
      );

      this.onChange.emit(filteredFormValue);
    }
}
