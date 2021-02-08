import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzenaEmanPageRoutingModule } from './izena-eman-routing.module';

import { IzenaEmanPage } from './izena-eman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzenaEmanPageRoutingModule
  ],
  declarations: [IzenaEmanPage]
})
export class IzenaEmanPageModule {}
