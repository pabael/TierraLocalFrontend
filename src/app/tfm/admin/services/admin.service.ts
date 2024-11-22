import { Injectable } from '@angular/core';
import { AdminDBSService } from './adminDBS.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';
import { Brand } from '../../shared/models/Brand';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private DBSservice: AdminDBSService, private sharedService: SharedService, private router: Router) { }
  
  createBrand(brand: Brand): void{

    this.DBSservice.createBrand(brand).subscribe({
      next:() => {console.log("creada")},
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  
}
