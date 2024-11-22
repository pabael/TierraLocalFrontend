import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './tfm/admin/components/brand-form/brand-form.component';
import { MainPageComponent } from './tfm/public/pages/main-page/main-page.component';
import { BrandFormPageComponent } from './tfm/admin/pages/brand-form-page/brand-form-page.component';
import { ErrorPageComponent } from './tfm/shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'admin',
    component: BrandFormPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
