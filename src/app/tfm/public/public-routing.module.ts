import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailPageComponent } from './pages/brand-detail-page/brand-detail-page.component';

const routes: Routes = [
  {
    path: 'brand/:name',
    component: BrandDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
