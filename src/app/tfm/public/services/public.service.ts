import { Data } from './../../shared/models/Data';
import { Injectable } from '@angular/core';
import { DbsService } from '../../shared/service/dbs.service';
import { map, Observable } from 'rxjs';
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

  getAllDataForFilters(): Data{

    let filtersInfo: Data =  this.adminService.getAllDataForBrandForm();
    this.dbsService.getLocationsWithBrands().subscribe(
      (data) => {
        filtersInfo.allLocations = data;
      }
    );

    this.dbsService.getProvincesWithBrands().subscribe(
      (data) => {
        filtersInfo.allProvinces = data;
      }
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
