import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErabiltzaileakEditatuPage } from './erabiltzaileak-editatu.page';

const routes: Routes = [
  {
    path: '',
    component: ErabiltzaileakEditatuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErabiltzaileakEditatuPageRoutingModule {}
