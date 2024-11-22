import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { BrandFormComponent } from "./components/brand-form/brand-form.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    BrandFormComponent,
    BrandFormPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
  ]
})

export class AdminModule{ }
