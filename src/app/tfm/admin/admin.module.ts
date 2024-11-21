import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { BrandFormComponent } from "./components/brand-form/brand-form.component";

import { FormsModule } from '@angular/forms';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';

@NgModule({
  declarations: [
    BrandFormComponent,
    BrandFormPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
  ]
})

export class AdminModule{ }
