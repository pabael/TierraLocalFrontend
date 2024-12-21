import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '../../../shared/models/Data';
import { Category } from '../../../shared/models/Category';
import { CardBrand } from '../../models/CardBrand';

@Component({
  selector: 'app-brand-list-page',
  templateUrl: './brand-list-page.component.html',
  styleUrl: './brand-list-page.component.sass'
})
export class BrandListPageComponent implements OnInit {

  isLoading: boolean = true; 

  brandsList: CardBrand[] = [];

  allfilters: Data = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  actualFilters: any = null

  filtersLoaded: boolean = false;
  categoryApplied: Category | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(private route: ActivatedRoute, private publicService: PublicService, private sharedService: SharedService, private router: Router){
  }

  ngOnInit(): void {
    this.publicService.getAllDataForFilters().subscribe({
      next:(data) => {
        this.allfilters = data;
        this.filtersLoaded = true;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    });
    
    this.route.params.subscribe(params => {
      this.actualFilters = this.publicService.getFiltersLocalStorage();
    
      if(this.actualFilters){
        this.categoryApplied = {name: this.actualFilters.category, subcategories: []};
        if(this.actualFilters.subcategory) this.categoryApplied.subcategories = [this.actualFilters.subcategory];
        this.filterChange(this.actualFilters);
      }
      else if(params['subcategory']){
        this.categoryApplied = {name:params['category'], subcategories: [params['subcategory']]};
        this.filterChange({category: params['category'], subcategory: params['subcategory']});
      }
      else if (params['category']) {
        this.categoryApplied = {name:params['category'], subcategories: []};
        this.filterChange({category: params['category']});
      }
      else{
        this.updateList();
      }
    });
  }

  private updateList(){
    this.publicService.getAllBrandsNameAndCategory().subscribe({
      next:(list) => {
        this.brandsList = list;
        this.isLoading = false;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    });
  }

  brandDetails(brand: string): void {
    this.publicService.saveFiltersLocalStorage(this.actualFilters);
    this.router.navigate(['/brand', brand]);
  }

  filterChange(filters: any){
    this.actualFilters = filters;
    this.publicService.getBrandsNameAndCategoryWithFilters(filters).subscribe({
      next:(result) => {
        this.brandsList = result;
        this.isLoading = false;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  get paginatedBrands() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.brandsList.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.brandsList.length / this.itemsPerPage);
  }
}
