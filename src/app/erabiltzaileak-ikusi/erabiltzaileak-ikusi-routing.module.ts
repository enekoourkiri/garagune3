import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErabiltzaileakIkusiPage } from './erabiltzaileak-ikusi.page';

const routes: Routes = [
  {
    path: '',
    component: ErabiltzaileakIkusiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErabiltzaileakIkusiPageRoutingModule {}
