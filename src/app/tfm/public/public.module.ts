import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { BrandDetailPageComponent } from './pages/brand-detail-page/brand-detail-page.component';
import { PublicRoutingModule } from "./public-routing.module";
import { CapitalizeFirstLetterPipe } from "./pipes/default-image.pipe";
import { BrandCardComponent } from './components/brand-card/brand-card.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { BrandListPageComponent } from './pages/brand-list-page/brand-list-page.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BrandDetailComponent,
    BrandDetailPageComponent,
    CapitalizeFirstLetterPipe,
    BrandCardComponent,
    BrandsListComponent,
    BrandListPageComponent,
    FiltersComponent,
    MapComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ],
  exports: [
    CapitalizeFirstLetterPipe
  ]
})

export class PublicModule{ }
