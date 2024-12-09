import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '../../../shared/models/Data';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-brand-list-page',
  templateUrl: './brand-list-page.component.html',
  styleUrl: './brand-list-page.component.sass'
})
export class BrandListPageComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private publicService: PublicService, private sharedService: SharedService, private router: Router){
  }

  ngOnInit(): void {
    this.filters = this.publicService.getAllDataForFilters();

    this.route.params.subscribe(params => {
      if (params['category']) {
        this.filterChange({category: params['category']});
      }else{
        this.updateList();
      }
    });
  }

  private updateList(){
    this.publicService.getallBrandsName().subscribe({
      next:(list) => {
        this.brandsList = list;
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
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }
}
