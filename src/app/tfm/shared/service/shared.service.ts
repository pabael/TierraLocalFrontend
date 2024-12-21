import { Data } from './../models/Data';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DbsService } from './dbs.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private error:HttpErrorResponse = new HttpErrorResponse({});

  constructor(private router: Router, private dbsService: DbsService) { }

  get getError(){
    return this.error;
  }

  set setError(error:HttpErrorResponse){
    this.error = error;
    console.log(error);
    this.router.navigate(['/error'])
  }

  getAllDataForBrandForm() : Data{
      
    let formInfo: Data = {
      allCategories: [],
      allLabels:    [],
      allConsumers: [],
      allPrices: [],
      allAutonomousCommunities: [],
      allProvinces: [],
      allLocations: []
    };    

    this.dbsService.getAllCategories().subscribe(
      (data) => {
        formInfo.allCategories = data;
      }
    );

    this.dbsService.getAllLabels().subscribe(
      (data) => {
        formInfo.allLabels = data;
      }
    );

    this.dbsService.getAllConsumers().subscribe(
      (data) => {
        formInfo.allConsumers = data;
      }
    );

    this.dbsService.getAllPrices().subscribe(
      (data) => {
        formInfo.allPrices = data;
      }
    );

    this.dbsService.getAllAutonomousCommunities().subscribe(
      (data) => {
        formInfo.allAutonomousCommunities = data;
      }
    );
    return formInfo;
  }

}
