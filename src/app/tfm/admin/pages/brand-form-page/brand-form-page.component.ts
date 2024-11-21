import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-brand-form-page',
  templateUrl: './brand-form-page.component.html',
  styleUrl: './brand-form-page.component.sass'
})
export class BrandFormPageComponent {

  constructor(private service: AdminService){}

}



  
