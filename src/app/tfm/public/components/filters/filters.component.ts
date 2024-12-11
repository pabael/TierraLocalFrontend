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
    console.log(this.filters);
    this.form = new FormGroup({
      crueltyFree:            new FormControl(null),
      vegan:                  new FormControl(null),
      subcategory:              new FormControl("TODAS"),
      labels:                   this.fb.array([]),
      consumer:                 new FormControl("TODAS"),
      price:                    new FormControl("0"),
      autonomousCommunity:      new FormControl({ value: "TODAS", disabled: false }),
      province:                 new FormControl({ value: "TODAS", disabled: false }),
      location:                 new FormControl({ value: "TODAS", disabled: false })
    }); 

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
    filteredFormValue['category'] = this.filters.allCategories[0].name;
    this.onChange.emit(filteredFormValue);
  }
}
