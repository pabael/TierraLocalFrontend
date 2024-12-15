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

  getAllDataForFilters(): Data {
    const filtersInfo: Data = this.adminService.getAllDataForBrandForm();
  
    forkJoin({
      allLocations: this.dbsService.getLocationsWithBrands(),
      allProvinces: this.dbsService.getProvincesWithBrands(),
    }).pipe(
      map(results => ({
        ...filtersInfo,
        allLocations: results.allLocations, 
        allProvinces: results.allProvinces,
      }))
    );

    return filtersInfo;
  }

  getBrandsNameForProvince(province: string): Observable<string[]>{
    return this.dbsService.getBrandsForProvince(province)
    .pipe(
      map(list => list.map(brand => brand.name))
    );
  }

}
