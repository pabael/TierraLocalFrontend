import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { AdminService } from '../../services/admin.service';
import { Consumer } from '../../../shared/models/Consumer';
import { Label } from '../../../shared/models/Label';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.sass'
})
export class CreatePageComponent {

  public messageCategory: string = "";
  public messageConsumer: string = "";
  public messageLabel: string = "";

  constructor(private adminService: AdminService){}

  categoryFormSubmited(category: Category): void{
    this.adminService.createCategory(category);
    this.messageCategory = "La categoría ha sido creada correctamente.";
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
    this.messageConsumer = "";
    this.messageLabel = "";
  }

}
