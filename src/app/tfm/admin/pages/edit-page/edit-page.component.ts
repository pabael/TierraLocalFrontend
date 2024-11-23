import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/service/shared.service';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.sass'
})
export class EditPageComponent implements OnInit {

  brandsList: string[] = [];

  constructor(private adminService: AdminService, private sharedService: SharedService, private dbsService: DbsService){
  }

  ngOnInit(): void {
    this.updateList();
  }

  private updateList(){
    this.adminService.getallBrandsName().subscribe({
      next:(list) => {
        this.brandsList = list;
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    });
  }

  public editBrand(brand:string):void{

  }

  deleteBrand(brand: string): void{
    this.dbsService.deleteBrand(brand).subscribe({
      next:() => {
        this.updateList();
      },
      error: (error:HttpErrorResponse) => {
        this.sharedService.setError = error;
      }
    })
  }

}
