import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';
import { Brand } from '../../shared/models/Brand';
import { DbsService } from '../../shared/service/dbs.service';
import { Category } from '../../shared/models/Category';

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

  
}
