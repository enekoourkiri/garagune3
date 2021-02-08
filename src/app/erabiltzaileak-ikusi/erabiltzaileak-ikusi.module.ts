import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErabiltzaileakIkusiPageRoutingModule } from './erabiltzaileak-ikusi-routing.module';

import { ErabiltzaileakIkusiPage } from './erabiltzaileak-ikusi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErabiltzaileakIkusiPageRoutingModule
  ],
  declarations: [ErabiltzaileakIkusiPage]
})
export class ErabiltzaileakIkusiPageModule {}
