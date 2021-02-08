import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiktogramakSortuPage } from './piktogramak-sortu.page';

const routes: Routes = [
  {
    path: '',
    component: PiktogramakSortuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiktogramakSortuPageRoutingModule {}
