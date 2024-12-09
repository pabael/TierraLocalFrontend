import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PublicService } from '../../services/public.service';
import { SharedService } from '../../../shared/service/shared.service';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent implements OnInit{

  brandsList: string[] = [];
  provinces: string[] = [];
  allCategories: string[] = [];

  constructor(private router: Router, private publicService: PublicService, private sharedService: SharedService, private dbsService: DbsService){  }

  ngOnInit(): void {
    this.dbsService.getProvincesWithBrands().subscribe({
      next:(provinces) => {
        this.provinces = provinces;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    });

    this.dbsService.getAllCategories().subscribe({
      next:(categories)=>{
        this.allCategories = categories.map(category => category.name);
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  provinceClicked(province: string): void{
    this.publicService.getBrandsNameForProvince(province).subscribe({
      next:(list) => {
        this.brandsList = list;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      } 
    })
  }

  brandDetails(brand: string): void {
    this.router.navigate(['/brand', brand]);
  }

}
