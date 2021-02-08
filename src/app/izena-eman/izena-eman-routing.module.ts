import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzenaEmanPage } from './izena-eman.page';

const routes: Routes = [
  {
    path: '',
    component: IzenaEmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzenaEmanPageRoutingModule {}
