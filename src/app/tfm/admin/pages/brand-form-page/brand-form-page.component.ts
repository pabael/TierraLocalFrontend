import { Component, OnInit } from '@angular/core';
import { BrandFormInfo } from '../../models/BrandFormInfo';
import { AdminService } from '../../services/admin.service';
import { Brand } from '../../../shared/models/Brand';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-brand-form-page',
  templateUrl: './brand-form-page.component.html',
  styleUrl: './brand-form-page.component.sass'
})
export class BrandFormPageComponent implements OnInit{

  formInfo: BrandFormInfo = {
    allCategories: [],
    allLabels:    [],
    allConsumers: [],
    allPrices: [],
    allAutonomousCommunities: [],
    allProvinces: [],
    allLocations: []
  }; 

  constructor(private dbsService: DbsService, private adminService: AdminService){}

  ngOnInit(){
    this.formInfo = this.dbsService.getAllDataForBrandForm();
  }

  formSubmited(formResult: Brand){
    this.adminService.createBrand(formResult);
  }

  autonomousCommunityChange(autonomousCommunity: string){
    this.dbsService.getAllProvinces(autonomousCommunity).subscribe(
      (data) => {
        this.formInfo.allProvinces = data;
      }
    );
  }

  provinceChange(province: string){
    this.dbsService.getAllLocations(province).subscribe(
      (data) => {
        this.formInfo.allLocations = data;
      }
    );
  }
}



  
