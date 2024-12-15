import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '../../../shared/models/Data';
import { DbsService } from '../../../shared/service/dbs.service';
import { Category } from '../../../shared/models/Category';

@Component({
  selector: 'app-brand-list-page',
  templateUrl: './brand-list-page.component.html',
  styleUrl: './brand-list-page.component.sass'
})
export class BrandListPageComponent implements OnInit {

  isLoading: boolean = true; 

  brandsList: string[] = [];

  filters: Data = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  filtersLoaded: boolean = false;
  categoryApplied: Category | null = null;

  constructor(private route: ActivatedRoute, private publicService: PublicService, private sharedService: SharedService, private router: Router){
  }

  ngOnInit(): void {

    this.publicService.getAllDataForFilters().subscribe({
      next:(result) => {
        this.filters = result;
        this.route.params.subscribe(params => {
          if(params['subcategory']){
            this.categoryApplied = {name:params['category'], subcategories: [params['subcategory']]};
            this.filterChange({category: params['category'], subcategory: params['subcategory']});
          }
          else if (params['category']) {
            this.categoryApplied = {name:params['category'], subcategories: []};
            this.filterChange({category: params['category']});
          }else{
            this.updateList();
          }
        });
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
        this.isLoading = false;
      }
    })
  }

  private updateList(){
    this.publicService.getallBrandsName().subscribe({
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
    this.router.navigate(['/brand', brand]);
  }

  filterChange(filters: any){
    this.publicService.getBrandsNameWithFilters(filters).subscribe({
      next:(result) => {
        this.brandsList = result;
        this.isLoading = false;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  subcategoryChange(data: {category: string, subcategory: string}){
    this.router.navigate(['/brands', data.category, data.subcategory]);
  }
}
