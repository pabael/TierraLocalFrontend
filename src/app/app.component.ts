import { Component, OnInit } from '@angular/core';
import { DbsService } from './tfm/shared/service/dbs.service';
import { Category } from './tfm/shared/models/Category';
import { SharedService } from './tfm/shared/service/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'tfm-frontend';

  constructor(private router: Router, private dbsService: DbsService, private sharedService: SharedService){}
  allCategories: Category[] = [];

  ngOnInit(): void {
    this.dbsService.getAllCategories().subscribe({
      next:(categories)=>{
        this.allCategories = categories;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

  otherClicked(page: string){
    this.router.navigate([`/${page}`]);
  }

  categoryClicked(category: string){
    this.router.navigate(['/brands', category]);
  }

  subcategoryClicked(data: {category: string, subcategory: string}){
    this.router.navigate(['/brands', data.category, data.subcategory]);
  }

}
