import { Injectable } from '@angular/core';
import { DbsService } from '../../shared/service/dbs.service';
import { SharedService } from '../../shared/service/shared.service';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private DbsService: DbsService, private sharedService: SharedService, private router: Router) { }
  
  getallBrandsName(): Observable<string[]>{
    return this.DbsService.getAllBrands().pipe(
      map(list => list.map(brand => brand.name))
    );
  }
}
