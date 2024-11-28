import { Component, OnInit } from '@angular/core';
import { Data } from '../../../shared/models/Data';
import { AdminService } from '../../services/admin.service';
import { Brand } from '../../../shared/models/Brand';
import { DbsService } from '../../../shared/service/dbs.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/service/shared.service';

@Component({
  selector: 'app-brand-form-page',
  templateUrl: './brand-form-page.component.html',
  styleUrl: './brand-form-page.component.sass'
})
export class BrandFormPageComponent implements OnInit{

  formInfo: Data = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  public editBrand: Brand | null = null;

  public editMode: boolean = false;

  constructor(private route: ActivatedRoute, private dbsService: DbsService, private adminService: AdminService, private sharedService: SharedService){}

  ngOnInit(){
    this.formInfo = this.adminService.getAllDataForBrandForm();
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.editMode = true;
        this.setBrand(params['name']); 
      } 
    });
  }

  private setBrand(brandName: string){
    this.dbsService.getBrand(brandName).subscribe({
      next: brandResponse => {
        this.editBrand = brandResponse;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  formSubmited(formResult: Brand){
    if(this.editMode){
      this.adminService.editBrand(formResult);
    }else{
      this.adminService.createBrand(formResult);
    }
  }

  autonomousCommunityChange(autonomousCommunity: string){
    this.dbsService.getAllProvincesOfAutonomousCommunities(autonomousCommunity).subscribe(
      (data) => {
        this.formInfo.allProvinces = data;
      }
    );
  }

  provinceChange(province: string){
    this.dbsService.getAllLocationsOfProvince(province).subscribe(
      (data) => {
        this.formInfo.allLocations = data;
      }
    );
  }
}



  
