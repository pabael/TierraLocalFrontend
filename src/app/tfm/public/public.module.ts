import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { BrandDetailPageComponent } from './pages/brand-detail-page/brand-detail-page.component';
import { PublicRoutingModule } from "./public-routing.module";
import { CapitalizeFirstLetterPipe } from "./pipes/default-image.pipe";

@NgModule({
  declarations: [
    MainPageComponent,
    BrandDetailComponent,
    BrandDetailPageComponent,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports: [
    CapitalizeFirstLetterPipe
  ]
})

export class PublicModule{ }
