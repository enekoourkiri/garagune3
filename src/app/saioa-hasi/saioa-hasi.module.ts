import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaioaHasiPageRoutingModule } from './saioa-hasi-routing.module';

import { SaioaHasiPage } from './saioa-hasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaioaHasiPageRoutingModule
  ],
  declarations: [SaioaHasiPage]
})
export class SaioaHasiPageModule {}
