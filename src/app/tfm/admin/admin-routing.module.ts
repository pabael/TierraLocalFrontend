import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormPageComponent } from './pages/brand-form-page/brand-form-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
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
      },
      {
        path: 'edit/:name',
        component: BrandFormPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
