import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";

import { AngularFireStorageModule } from '@angular/fire/storage';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { AlertController } from '@ionic/angular';

import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { Base64 } from '@ionic-native/base64/ngx';


import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import 'firebase/firestore';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule],
  providers: [
    StatusBar,
    Base64,
    FilePath,
    FileChooser,
    ImagePicker,
    AngularFireAuthGuardModule,
    Crop,
    WebView,
    File,
    Camera,
    FormBuilder,
    ScreenOrientation,
    AlertController,
    AngularFirestoreModule,
    SplashScreen,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



