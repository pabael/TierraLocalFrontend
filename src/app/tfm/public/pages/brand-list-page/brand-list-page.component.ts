import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand-list-page',
  templateUrl: './brand-list-page.component.html',
  styleUrl: './brand-list-page.component.sass'
})
export class BrandListPageComponent implements OnInit {
  brandsList: string[] = [];

  constructor(private publicService: PublicService, private sharedService: SharedService,private router: Router){
  }

  ngOnInit(): void {
    this.updateList();
  }

  private updateList(){
    this.publicService.getallBrandsName().subscribe({
      next:(list) => {
        this.brandsList = list;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    });
  }

  brandDetails(brand: string): void {
    this.router.navigate(['/brand', brand]);
  }
}
