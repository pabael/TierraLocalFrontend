import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { map, Observable } from 'rxjs';
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
    return this.http.get<{ name: string }[]>('http://localhost:8080/labels').pipe(
      map(labels => labels.map(label => label.name))
    );  
  }

  getAllConsumers(): Observable<string[]>{
    return this.http.get<{ type: string }[]>('http://localhost:8080/consumers').pipe(
      map(consumers => consumers.map(consumer => consumer.type))
    );  
  }

  getAllPrices(): Observable<number[]>{
    return this.http.get<{ priceRange: number }[]>('http://localhost:8080/prices').pipe(
      map(prices => prices.map(price => price.priceRange))
    );  
  }

  getAllAutonomousCommunities(): Observable<string[]>{
    return this.http.get<{ name: string }[]>('http://localhost:8080/autonomousCommunities').pipe(
      map(autonomousCommunities => autonomousCommunities.map(autonomousCommunity => autonomousCommunity.name))
    );  
  }

  getAllProvinces(autonomousCommunity: string ): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`http://localhost:8080/provinces?autonomousCommunity=${autonomousCommunity}`).pipe(
      map(provinces => provinces.map(province => province.name))
    );  
  }

  getAllLocations(province: string): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`http://localhost:8080/locations?province=${province}`).pipe(
      map(locations => locations.map(location => location.name))
    );  
  }

  getAllDataForBrandForm() : BrandFormInfo{
    
    let formInfo: BrandFormInfo = {
      allCategories: [],
      allLabels:    [],
      allConsumers: [],
      allPrices: [],
      allAutonomousCommunities: [],
      allProvinces: [],
      allLocations: []
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
