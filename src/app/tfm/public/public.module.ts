import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BrandDetailComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports: [
  ]
})

export class PublicModule{ }
