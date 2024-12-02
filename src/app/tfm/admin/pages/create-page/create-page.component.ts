import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { AdminService } from '../../services/admin.service';
import { Consumer } from '../../../shared/models/Consumer';
import { Label } from '../../../shared/models/Label';
import { DbsService } from '../../../shared/service/dbs.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.sass'
})
export class CreatePageComponent implements OnInit {

  public messageCategory: string = "";
  public messageSubcategory: string = "";
  public messageConsumer: string = "";
  public messageLabel: string = "";

  allCategories: Category[] = [];

  constructor(private dbsService: DbsService, private adminService: AdminService){}

  ngOnInit(){
    this.dbsService.getAllCategories().subscribe(
      (data) => {
        this.allCategories = data;
      }
    );
  }

  categoryFormSubmited(category: Category): void{
    this.adminService.createCategory(category);
    this.messageCategory = "La categoría ha sido creada correctamente.";
  }

  subcategoryFormSubmited(category: Category): void{
    this.adminService.createSubcategory(category);
    this.messageSubcategory = "La subcategoría ha sido creada correctamente.";
  }

  consumerFormSubmited(consumer: Consumer): void{
    this.adminService.createConsumer(consumer);
    this.messageConsumer = "El tipo de consumidor ha sido creado correctamente.";
  }

  labelFormSubmited(label: Label): void{
    this.adminService.createLabel(label);
    this.messageLabel = "El certificado ha sido creado correctamente.";
  }

  cleanMessage(): void {
    this.messageCategory = "";
    this.messageSubcategory = "";
    this.messageConsumer = "";
    this.messageLabel = "";
  }

}
