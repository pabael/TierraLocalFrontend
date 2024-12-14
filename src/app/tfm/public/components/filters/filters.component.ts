import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../../../shared/models/Data';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/models/Category';

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

  @Input()
  categoryApplied: Category | null = null;

  subcategoriesAfterFilter: string[] | null = null;

  @Output()
  public onChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onSubcategoryChange: EventEmitter<{category: string, subcategory: string}> = new EventEmitter<{category: string, subcategory: string}>();

  constructor(private fb: FormBuilder){}

  isVegan: boolean = false;
  isCrueltyFree: boolean = false;

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    const categoryValue = this.categoryApplied ? this.categoryApplied.name : "TODAS";

    const subcategoryValue = (this.categoryApplied && this.categoryApplied.subcategories && this.categoryApplied.subcategories.length > 0)
    ? this.categoryApplied.subcategories[0]
    : "TODAS";
    
    this.form = new FormGroup({
      category:                 new FormControl(categoryValue),
      subcategory:              new FormControl(subcategoryValue),
      crueltyFree:              new FormControl(null),
      vegan:                    new FormControl(null),
      labels:                   this.fb.array([]),
      consumer:                 new FormControl("TODAS"),
      price:                    new FormControl("0"),
      autonomousCommunity:      new FormControl({ value: "TODAS", disabled: false }),
      province:                 new FormControl({ value: "TODAS", disabled: false }),
      location:                 new FormControl({ value: "TODAS", disabled: false })
    }); 

    if(this.categoryApplied && this.categoryApplied.subcategories && this.categoryApplied.subcategories.length == 0) this.subcategoriesAfterFilter = this.filters.allCategories.filter(category => category.name == this.categoryApplied?.name)[0].subcategories;
  }

  subcategoryChange(){
    this.onSubcategoryChange.emit({category: this.categoryApplied!.name, subcategory: this.form.get('subcategory')?.value});
  }

  onAutonomousCommunityChange(){
    if (this.form.get("autonomousCommunity")?.value !== "TODAS") {
      this.form.get("province")?.disable();
      this.form.get("location")?.disable();
    } else {
      this.form.get("province")?.enable();
      this.form.get("location")?.enable();
    }

    this.filterChange();
  }

  onProvinceChange(){
    if (this.form.get("province")?.value !== "TODAS") {
      this.form.get("autonomousCommunity")?.disable();
      this.form.get("location")?.disable();
    } else {
      this.form.get("autonomousCommunity")?.enable();
      this.form.get("location")?.enable();
    }

    this.filterChange();
  }

  onLocationChange(){
    if (this.form.get("location")?.value !== "TODAS") {
      this.form.get("province")?.disable();
      this.form.get("autonomousCommunity")?.disable();
    } else {
      this.form.get("province")?.enable();
      this.form.get("autonomousCommunity")?.enable();
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
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined && value !== false && (!Array.isArray(value) || value.length > 0) && value !== "0" && value != "TODAS")
    );

    this.onChange.emit(filteredFormValue);
  }
}
