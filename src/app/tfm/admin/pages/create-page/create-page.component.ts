import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { DbsService } from '../../../shared/service/dbs.service';
import { AdminService } from '../../services/admin.service';
import { Consumer } from '../../../shared/models/Consumer';
import { Label } from '../../../shared/models/Label';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.sass'
})
export class CreatePageComponent {

  constructor(private dbsService: DbsService, private adminService: AdminService){}

  categoryFormSubmited(category: Category): void{
    this.adminService.createCategory(category);
  }

  consumerFormSubmited(consumer: Consumer): void{
    this.adminService.createConsumer(consumer);
  }

  labelFormSubmited(label: Label): void{
    this.adminService.createLabel(label);
  }

}
