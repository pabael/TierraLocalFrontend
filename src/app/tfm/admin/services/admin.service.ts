import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';
import { Brand } from '../../shared/models/Brand';
import { DbsService } from '../../shared/service/dbs.service';
import { Category } from '../../shared/models/Category';
import { Consumer } from '../../shared/models/Consumer';
import { Label } from '../../shared/models/Label';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private DbsService: DbsService, private sharedService: SharedService, private router: Router) { }
  
  createBrand(brand: Brand): void{
    this.DbsService.createBrand(brand).subscribe({
      next:() => {
        this.router.navigate(['/brand', brand.name]);
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  editBrand(brand: Brand): void{
    this.DbsService.editBrand(brand).subscribe({
      next:() => {
        this.router.navigate(['/brand', brand.name]);
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }


  createCategory(category: Category): void{
    this.DbsService.createCategory(category).subscribe({
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  createConsumer(consumer: Consumer): void{
    this.DbsService.createConsumer(consumer).subscribe({
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  createLabel(label: Label): void{
    this.DbsService.createLabel(label).subscribe({
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  getallBrandsName(): Observable<string[]>{
    return this.DbsService.getAllBrands().pipe(
      map(list => list.map(brand => brand.name))
    );
  }

}
