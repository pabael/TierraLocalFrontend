import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.sass'
})
export class BrandCardComponent {
  @Input()
  brand: string = '';

  @Output()
  public onBrandDetails: EventEmitter<string> = new EventEmitter<string>();

  brandDetails(): void {
    this.onBrandDetails.emit(this.brand);
  }
}
