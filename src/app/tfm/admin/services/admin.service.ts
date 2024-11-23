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

  createCategory(category: Category): void{
    this.DbsService.createCategory(category).subscribe({
      next:() => {
        console.log("category created")
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  createConsumer(consumer: Consumer): void{
    this.DbsService.createConsumer(consumer).subscribe({
      next:() => {
        console.log("consumer created")
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  createLabel(label: Label): void{
    this.DbsService.createLabel(label).subscribe({
      next:() => {
        console.log("label created")
      },
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

  deleteBrand(brand: string): void{
    this.DbsService.deleteBrand(brand).subscribe({
      next:() => {
        console.log("brand deleted")
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  
}
