import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { Router } from '@angular/router';
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

  constructor(private publicService: PublicService, private dbsService: DbsService, private sharedService: SharedService,private router: Router){
  }

  ngOnInit(): void {
    this.updateList();
    this.filters = this.dbsService.getAllDataForBrandForm();
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
    console.log(filters);
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
