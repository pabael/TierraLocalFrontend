import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../models/Category';
import { BrandFormInfo } from '../../models/BrandFormInfo';

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

  ngOnInit(){
    this.formInfo = this.service.getAllDataForBrandForm();
  
  }

  constructor(private service: AdminService){}

  autonomousCommunityChange(autonomousCommunity: string){
    this.service.getAllProvinces(autonomousCommunity).subscribe(
      (data) => {
        this.formInfo.allProvinces = data;
      }
    );
  }
}



  
