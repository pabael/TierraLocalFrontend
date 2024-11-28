import { Injectable } from '@angular/core';
import { DbsService } from '../../shared/service/dbs.service';
import { SharedService } from '../../shared/service/shared.service';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private dbsService: DbsService) { }
  
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
}
