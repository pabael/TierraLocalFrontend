import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';
import { Brand } from '../../shared/models/Brand';
import { DbsService } from '../../shared/service/dbs.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private DbsService: DbsService, private sharedService: SharedService, private router: Router) { }
  
  createBrand(brand: Brand): void{

    this.DbsService.createBrand(brand).subscribe({
      next:() => {
        if (brand.name) {
          this.router.navigate(['/brand', brand.name]);
        } else {
          console.error('El nombre de la marca es inválido.');
        }
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  
}
