import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../../../shared/models/Brand';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.sass'
})
export class BrandDetailComponent{

  @Input()
  brand: Brand = {
    name: ''
  };
}
