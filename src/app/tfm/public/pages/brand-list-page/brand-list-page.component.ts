import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Filters } from '../../../shared/models/Filters';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-brand-list-page',
  templateUrl: './brand-list-page.component.html',
  styleUrl: './brand-list-page.component.sass'
})
export class BrandListPageComponent implements OnInit {

  brandsList: string[] = [];

  filters: Filters = {
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

  autonomousCommunityChange(autonomousCommunity: string){
    this.dbsService.getAllProvinces(autonomousCommunity).subscribe(
      (data) => {
        this.filters.allProvinces = data;
      }
    );
  }

  provinceChange(province: string){
    this.dbsService.getAllLocations(province).subscribe(
      (data) => {
        this.filters.allLocations = data;
      }
    );
  }
}
