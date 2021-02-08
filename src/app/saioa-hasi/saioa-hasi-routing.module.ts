import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaioaHasiPage } from './saioa-hasi.page';

const routes: Routes = [
  {
    path: '',
    component: SaioaHasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaioaHasiPageRoutingModule {}
