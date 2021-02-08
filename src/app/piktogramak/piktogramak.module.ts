import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiktogramakPageRoutingModule } from './piktogramak-routing.module';

import { PiktogramakPage } from './piktogramak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiktogramakPageRoutingModule
  ],
  declarations: [PiktogramakPage]
})
export class PiktogramakPageModule {}
