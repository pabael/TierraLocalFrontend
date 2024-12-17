import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardBrand } from '../../models/CardBrand';
import { CategoryIcons } from '../../models/CategoryIcons';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.sass'
})
export class BrandCardComponent {
  @Input()
  brand: CardBrand = {name: '', categories: []};

  @Output()
  public onBrandDetails: EventEmitter<string> = new EventEmitter<string>();

  brandDetails(): void {
    this.onBrandDetails.emit(this.brand.name);
  }

  getIconForCategory(category: string): string {
      return CategoryIcons[category as keyof typeof CategoryIcons] || 'fa-brands fa-shopify';
  }
}
