import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PublicService } from '../../services/public.service';
import { SharedService } from '../../../shared/service/shared.service';
import { DbsService } from '../../../shared/service/dbs.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent implements OnInit{

  brandsList: string[] = [];
  provinces: string[] = [];
  allCategories: string[] = [];

  isLoading: boolean = true;

  constructor(private router: Router, private publicService: PublicService, private sharedService: SharedService, private dbsService: DbsService){  }

  ngOnInit(): void {
    forkJoin({
      provinces: this.dbsService.getProvincesWithBrands(),
      categories: this.dbsService.getAllCategories()
    }).subscribe({
      next: ({ provinces, categories }) => {
        this.provinces = provinces;
        this.allCategories = categories.map(category => category.name);
        this.isLoading = false; 
      },
      error: (error: HttpErrorResponse) => {
        this.sharedService.setError = error;
        this.isLoading = false;
      }
    });
  }

  categoryClicked(category: string): void{
    this.router.navigate(['/brands', category]);
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
