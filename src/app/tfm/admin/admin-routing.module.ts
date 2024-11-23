import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'newBrand',
        component: BrandFormPageComponent
      },
      {
        path: 'create',
        component: CreatePageComponent
      },
      {
        path: 'edit',
        component: EditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
