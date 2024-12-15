import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbsService } from '../../../shared/service/dbs.service';
import { SharedService } from '../../../shared/service/shared.service';
import { Brand } from '../../../shared/models/Brand';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand-detail-page',
  templateUrl: './brand-detail-page.component.html',
  styleUrl: './brand-detail-page.component.sass'
})
export class BrandDetailPageComponent implements OnInit {

  public brand: Brand = {
    name: ''
  };

  isLoading: boolean = true; 

  constructor(private route: ActivatedRoute, private dbsService: DbsService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brand.name = params['name'];
      this.setBrand();
    });
  }

  private setBrand(){
    this.dbsService.getBrand(this.brand.name).subscribe({
      next: brandResponse => {
        this.brand = brandResponse;
        this.isLoading = false; 

      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

}
