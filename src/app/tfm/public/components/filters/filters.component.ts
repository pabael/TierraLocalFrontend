import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../../../shared/models/Data';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/models/Category';
import { ActivatedRoute, Router } from '@angular/router';

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
  actualFilters: any = null;

  categoryApplied: Category | null = null;
  filteredSubcategories: string[] | null = null;

  showAdditionalFilters: boolean = false;

  @Output()
  public onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder){}

  isVegan: boolean = false;
  isCrueltyFree: boolean = false;

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params['subcategory']){
        this.categoryApplied = {name:params['category'], subcategories: [params['subcategory']]};
      }
      else if (params['category']) {
        this.categoryApplied = {name:params['category'], subcategories: []};
        this.filteredSubcategories = this.filters.allCategories.filter(category => category.name == params['category'])[0].subcategories;
      }
    });
    
    const categoryValue = this.categoryApplied ? this.categoryApplied.name : "TODAS";

    const subcategoryValue = (this.categoryApplied && this.categoryApplied.subcategories && this.categoryApplied.subcategories.length > 0)
    ? this.categoryApplied.subcategories[0]
    : "TODAS";
    
    this.form = new FormGroup({
      category:                 new FormControl(categoryValue),
      subcategory:              new FormControl(subcategoryValue),
      crueltyFree:              new FormControl(this.actualFilters?.crueltyFree),
      vegan:                    new FormControl(this.actualFilters?.vegan),
      labels:                   this.fb.array(this.actualFilters?.labels ? this.actualFilters.labels : []),
      consumer:                 new FormControl(this.actualFilters?.consumer ? this.actualFilters.consumer : "TODAS"),
      price:                    new FormControl(this.actualFilters?.price ? this.actualFilters.price : "0"),
      autonomousCommunity:      new FormControl({ value: this.actualFilters?.autonomousCommunity ? this.actualFilters.autonomousCommunity : "TODAS", disabled: false }),
      province:                 new FormControl({ value: this.actualFilters?.province ? this.actualFilters.province : "TODAS", disabled: false }),
      location:                 new FormControl({ value: this.actualFilters?.location ? this.actualFilters.location : "TODAS", disabled: false })
    }); 

  }

  toggleAdditionalFilters() {
    this.showAdditionalFilters = !this.showAdditionalFilters;
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

  subcategoryChange(){
    this.filterChange();
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
        .filter(([_, value]) => 
          value !== null && 
          value !== '' && 
          value !== undefined && 
          value !== false && 
          (!Array.isArray(value) || value.length > 0) && 
          value !== "0" && 
          value !== "TODAS"
        )
    );
  
    this.onChange.emit(filteredFormValue);
  
    const { category, subcategory, ...otherFilters } = filteredFormValue;
  
    let targetRoute = ['/brands'];
    if (category) {
      targetRoute.push(String(category));
      if (subcategory && subcategory !== "TODAS") {
        targetRoute.push(String(subcategory));
      }
    }

    const {vegan, crueltyFree, labels, consumer, price, autonomousCommunity, province, location } = filteredFormValue;

    const labelsArray = this.labelsArray.value as string[];
  
    const queryParams: any = {
      vegan: vegan || null,
      crueltyFree: crueltyFree || null,
      labels: labelsArray && labelsArray.length > 0 ? labelsArray.join(',') : null,
      consumer: consumer || null,
      price: price || null,
      autonomousCommunity: autonomousCommunity || null,
      province: province || null,
      location: location || null
    };

    this.router.navigate(targetRoute, {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
  
}
