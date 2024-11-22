import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { DbsService } from '../../../shared/service/dbs.service';
import { AdminService } from '../../services/admin.service';

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

}
