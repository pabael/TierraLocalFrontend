import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBrand } from '../../models/CardBrand';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.sass'
})
export class BrandsListComponent {

  @Input()
  brandsList: CardBrand[] = [];

  @Output()
  public onBrandDetails: EventEmitter<string> = new EventEmitter<string>();

  brandDetails(brand: string): void {
    this.onBrandDetails.emit(brand);
  }

}
