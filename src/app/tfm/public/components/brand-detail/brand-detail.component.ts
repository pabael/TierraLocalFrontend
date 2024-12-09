import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../../../shared/models/Brand';
import { ActivatedRoute } from '@angular/router';
import { DbsService } from '../../../shared/service/dbs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/service/shared.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.sass'
})
export class BrandDetailComponent implements OnInit {

  public brand: Brand = {
    name: ''
  };

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
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

}
