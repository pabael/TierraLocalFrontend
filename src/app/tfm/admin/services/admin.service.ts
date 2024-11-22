import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { BrandFormInfo } from '../models/BrandFormInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private router: Router) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:8080/categories')
  }

  getAllLabels(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8080/labels')
  }

  getAllConsumers(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8080/consumers')
  }

  getAllPrices(): Observable<number[]>{
    return this.http.get<number[]>('http://localhost:8080/prices')
  }

  getAllAutonomousCommunities(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8080/autonomousCommunities')
  }

  getAllProvinces(autonomousCommunity: string ): Observable<string[]>{
    return this.http.get<string[]>(`http://localhost:8080/province?name=${autonomousCommunity}`)
  }

  getAllDataForBrandForm() : BrandFormInfo{
    
    let formInfo: BrandFormInfo = {
      allCategories: [],
      allLabels:    [],
      allConsumers: [],
      allPrices: [],
      allAutonomousCommunities: [],
      allProvinces: [],
    };    

    this.getAllCategories().subscribe(
      (data) => {
        formInfo.allCategories = data;
      }
    );

    this.getAllLabels().subscribe(
      (data) => {
        formInfo.allLabels = data;
      }
    );

    this.getAllConsumers().subscribe(
      (data) => {
        formInfo.allConsumers = data;
      }
    );

    this.getAllPrices().subscribe(
      (data) => {
        formInfo.allPrices = data;
      }
    );

    this.getAllAutonomousCommunities().subscribe(
      (data) => {
        formInfo.allAutonomousCommunities = data;
      }
    );
    return formInfo;
  }


}
