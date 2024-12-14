import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './tfm/public/pages/home-page/home-page.component';
import { ErrorPageComponent } from './tfm/shared/error-page/error-page.component';
import { AdminPageComponent } from './tfm/admin/pages/admin-page/admin-page.component';
import { AuthGuard } from './tfm/admin/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
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
