import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErabiltzaileakEditatuPageRoutingModule } from './erabiltzaileak-editatu-routing.module';

import { ErabiltzaileakEditatuPage } from './erabiltzaileak-editatu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErabiltzaileakEditatuPageRoutingModule
  ],
  declarations: [ErabiltzaileakEditatuPage]
})
export class ErabiltzaileakEditatuPageModule {}
