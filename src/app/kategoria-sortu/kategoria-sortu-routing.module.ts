import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategoriaSortuPage } from './kategoria-sortu.page';

const routes: Routes = [
  {
    path: '',
    component: KategoriaSortuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoriaSortuPageRoutingModule {}
