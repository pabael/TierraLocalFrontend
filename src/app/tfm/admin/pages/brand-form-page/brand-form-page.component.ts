import { Component, OnInit } from '@angular/core';
import { AdminDBSService } from '../../services/adminDBS.service';
import { BrandFormInfo } from '../../models/BrandFormInfo';
import { AdminService } from '../../services/admin.service';
import { Brand } from '../../../shared/models/Brand';

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

  constructor(private adminDBSservice: AdminDBSService, private adminService: AdminService){}

  ngOnInit(){
    this.formInfo = this.adminDBSservice.getAllDataForBrandForm();
  }

  formSubmited(formResult: Brand){
    this.adminService.createBrand(formResult);
  }

  autonomousCommunityChange(autonomousCommunity: string){
    this.adminDBSservice.getAllProvinces(autonomousCommunity).subscribe(
      (data) => {
        this.formInfo.allProvinces = data;
      }
    );
  }

  provinceChange(province: string){
    this.adminDBSservice.getAllLocations(province).subscribe(
      (data) => {
        this.formInfo.allLocations = data;
      }
    );
  }
}



  
