import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Brand } from '../models/Brand';
import { Data } from '../models/Data';
import { Consumer } from '../models/Consumer';
import { Label } from '../models/Label';

@Injectable({
  providedIn: 'root'
})
export class DbsService {

  apiUrl: string = 'http://localhost:8080/';
  constructor(private http:HttpClient, private router: Router) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}categories`)
  }

  getAllLabels(): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}labels`).pipe(
      map(labels => labels.map(label => label.name))
    );  
  }

  getAllConsumers(): Observable<string[]>{
    return this.http.get<{ type: string }[]>(`${this.apiUrl}consumers`).pipe(
      map(consumers => consumers.map(consumer => consumer.type))
    );  
  }

  getAllPrices(): Observable<number[]>{
    return this.http.get<{ priceRange: number }[]>(`${this.apiUrl}prices`).pipe(
      map(prices => prices.map(price => price.priceRange))
    );  
  }

  getAllAutonomousCommunities(): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}autonomousCommunities`).pipe(
      map(autonomousCommunities => autonomousCommunities.map(autonomousCommunity => autonomousCommunity.name))
    );  
  }

  getAllProvincesOfAutonomousCommunities(autonomousCommunity: string ): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}provinces?autonomousCommunity=${autonomousCommunity}`).pipe(
      map(provinces => provinces.map(province => province.name))
    );  
  }

  getAllLocationsOfProvince(province: string): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}locations?province=${province}`).pipe(
      map(locations => locations.map(location => location.name))
    );  
  }

  createBrand(brand: Brand): Observable<Brand> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Brand>(`${this.apiUrl}brand`, brand, { headers });
  }

  editBrand(brand: Brand): Observable<Brand> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Brand>(`${this.apiUrl}brand`, brand, { headers });
  }

  deleteBrand(brand: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}brand?brandName=${brand}`);
  }

  getBrand(brandName: string): Observable<Brand>{
    return this.http.get<Brand>(`${this.apiUrl}brand?brand=${brandName}`);
  }

  getAllBrands(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.apiUrl}brands`);
  }

  createCategory(category: Category): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}category`, category, { headers });
  }

  createSubcategory({ name, category }: { name: string; category: string }): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}subcategory`, {name: name, category: category}, { headers });
  }

  createConsumer(consumer: Consumer): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}consumer`, consumer, { headers });
  }

  createLabel(label: Label): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}label`, label, { headers });
  }

  getBrandsWithFilters(filters: any): Observable<Brand[]>{
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params = params.append(key, item);
          });
        } else {
          params = params.append(key, value);
        }
      }
    });

    return this.http.get<Brand[]>(`${this.apiUrl}brands/filter?`, { params });
  } 

  getLocationsWithBrands(): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}locations/with-brands`).pipe(
      map(locations => locations.map(location => location.name))
    );  
  }

  getProvincesWithBrands(): Observable<string[]>{
    return this.http.get<{ name: string }[]>(`${this.apiUrl}provinces/with-brands`).pipe(
      map(provinces => provinces.map(province => province.name))
    );  
  }

}
