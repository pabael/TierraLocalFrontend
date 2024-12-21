import { Data } from './../../shared/models/Data';
import { Injectable } from '@angular/core';
import { DbsService } from '../../shared/service/dbs.service';
import { forkJoin, map, Observable } from 'rxjs';
import { CardBrand } from '../models/CardBrand';
import { SharedService } from '../../shared/service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private dbsService: DbsService, private sharedService: SharedService) { }

  saveFiltersLocalStorage(data: any): void{
    const filters = {
      filters: data,
    };
    localStorage.setItem('filters', JSON.stringify(filters));
  }

  getFiltersLocalStorage(): any {
    const savedState = localStorage.getItem('filters');
    localStorage.removeItem('filters');
    if (!savedState) return null;
    return JSON.parse(savedState).filters;
  }
  
  getAllBrandsNameAndCategory(): Observable<CardBrand[]> {
    return this.dbsService.getAllBrands().pipe(
      map(list => list.map(brand => ({
        name: brand.name,
        categories: brand.categories ? brand.categories.map(category => category.name) : []
      })))
    );
  }

  getBrandsNameAndCategoryWithFilters(filters: any): Observable<CardBrand[]>{
    return this.dbsService.getBrandsWithFilters(filters)
    .pipe(
      map(list => list.map(brand => ({
        name: brand.name,
        categories: brand.categories ? brand.categories.map(category => category.name) : []
      })))
    );
  }

  getAllDataForFilters(): Observable<Data> {
    const filtersInfo: Data = this.sharedService.getAllDataForBrandForm();
  
    return forkJoin({
      
      allLocations: this.dbsService.getLocationsWithBrands(),
      allProvinces: this.dbsService.getProvincesWithBrands(),
      allAutonomousCommunities: this.dbsService.getAutonomousCommunitiesWithBrands()
    }).pipe(
      map(results => ({
        ...filtersInfo,
        allLocations: results.allLocations, 
        allProvinces: results.allProvinces,
        allAutonomousCommunities: results.allAutonomousCommunities
      }))
    );
  }

  getBrandsNameAndCategoryForProvince(province: string): Observable<CardBrand[]>{
    return this.dbsService.getBrandsForProvince(province)
    .pipe(
      map(list => list.map(brand => ({
        name: brand.name,
        categories: brand.categories ? brand.categories.map(category => category.name) : []
      })))
    );
  }

}
