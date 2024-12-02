import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { BrandFormComponent } from "./components/brand-form/brand-form.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { LabelsFormComponent } from './components/labels-form/labels-form.component';
import { ConsumersFormComponent } from './components/consumers-form/consumers-form.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LoginComponent } from './components/login/login.component';
import { SubcategoriesFormComponent } from './components/subcategories-form/subcategories-form.component';

@NgModule({
  declarations: [
    BrandFormComponent,
    BrandFormPageComponent,
    AdminPageComponent,
    CreatePageComponent,
    CategoriesFormComponent,
    LabelsFormComponent,
    ConsumersFormComponent,
    BrandsListComponent,
    EditPageComponent,
    LoginComponent,
    SubcategoriesFormComponent
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
