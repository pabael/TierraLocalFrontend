import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.sass'
})
export class BrandsListComponent {

  @Input()
  brandsList: string[] = [];

  @Output()
  public onBrandDetails: EventEmitter<string> = new EventEmitter<string>();

  brandDetails(brand: string): void {
    this.onBrandDetails.emit(brand);
  }

}
