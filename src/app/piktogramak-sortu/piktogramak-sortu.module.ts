import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiktogramakSortuPageRoutingModule } from './piktogramak-sortu-routing.module';

import { PiktogramakSortuPage } from './piktogramak-sortu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiktogramakSortuPageRoutingModule
  ],
  declarations: [PiktogramakSortuPage]
})
export class PiktogramakSortuPageModule {}
