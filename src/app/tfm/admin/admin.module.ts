import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { BrandFormComponent } from "./components/brand-form/brand-form.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
  declarations: [
    BrandFormComponent,
    BrandFormPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
  ]
})

export class AdminModule{ }
