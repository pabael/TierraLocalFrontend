import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailPageComponent } from './pages/brand-detail-page/brand-detail-page.component';
import { BrandListPageComponent } from './pages/brand-list-page/brand-list-page.component';

const routes: Routes = [
  {
    path: 'brand/:name',
    component: BrandDetailPageComponent
  },
  {
    path: 'brands',
    component: BrandListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
