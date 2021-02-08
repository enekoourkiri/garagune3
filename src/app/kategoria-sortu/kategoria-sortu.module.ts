import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { KategoriaSortuPageRoutingModule } from './kategoria-sortu-routing.module';

import { KategoriaSortuPage } from './kategoria-sortu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategoriaSortuPageRoutingModule
  ],
  declarations: [KategoriaSortuPage]
})
export class KategoriaSortuPageModule {}
