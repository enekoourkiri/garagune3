import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategoriakPage } from './kategoriak.page';

const routes: Routes = [
  {
    path: '',
    component: KategoriakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoriakPageRoutingModule {}
