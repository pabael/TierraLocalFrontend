import { Data } from './../../shared/models/Data';
import { Injectable } from '@angular/core';
import { DbsService } from '../../shared/service/dbs.service';
import { forkJoin, map, Observable } from 'rxjs';
import { AdminService } from '../../admin/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private dbsService: DbsService, private adminService: AdminService) { }

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
  
  getallBrandsName(): Observable<string[]>{
    return this.dbsService.getAllBrands().pipe(
      map(list => list.map(brand => brand.name))
    );
  }

  getBrandsNameWithFilters(filters: any): Observable<string[]>{
    return this.dbsService.getBrandsWithFilters(filters)
    .pipe(
      map(list => list.map(brand => brand.name))
    );
  }

  getAllDataForFilters(): Observable<Data> {
    const filtersInfo: Data = this.adminService.getAllDataForBrandForm();
  
    return forkJoin({
      
      allLocations: this.dbsService.getLocationsWithBrands(),
      allProvinces: this.dbsService.getProvincesWithBrands(),
    }).pipe(
      map(results => ({
        ...filtersInfo,
        allLocations: results.allLocations, 
        allProvinces: results.allProvinces,
      }))
    );
  }

  getBrandsNameForProvince(province: string): Observable<string[]>{
    return this.dbsService.getBrandsForProvince(province)
    .pipe(
      map(list => list.map(brand => brand.name))
    );
  }

}
