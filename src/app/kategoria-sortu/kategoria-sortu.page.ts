import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'firebase/auth';
import 'firebase/firestore';
import '@firebase/storage'

import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-kategoria-sortu',
  templateUrl: './kategoria-sortu.page.html',
  styleUrls: ['./kategoria-sortu.page.scss'],
})
export class KategoriaSortuPage implements OnInit {

  picNombre: string;
  kategoria: string;
  izena: string;
  img

  data;
  botoia
  inputa

  croppedImage: string;
  percent;
  isUploadStart = false;

  constructor(
    public router: Router,
    public platform: Platform,
    private firebaseZerbitzua: FirebaseDbService,
    public alert: AlertController,
    private camera: Camera,) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      // 'hybrid' detects both Cordova and Capacitor
      if (this.platform.is('hybrid')) {
          this.inputa = false;
          this.botoia = true;
      } else {
          this.inputa  = true;
          this.botoia = false;
      }
    });
  }

  update(e: FileList) {
    this.img = e.item(0);

  }

  async uploadFile() {

    const alertDialog = await this.alert.create({
      header: 'Elija una opción',
      buttons: [
        {
          text: 'Camara',
          handler: () => {
            let options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.CAMERA,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              targetHeight: 500,
              targetWidth: 500,
              correctOrientation: true
            };
            this.camera.getPicture(options).then(filePath => {
              this.croppedImage = 'data:image/jpeg;base64,' + filePath;
              alert(this.croppedImage);
              setTimeout(() => {
                document.getElementById('image').setAttribute('src', this.croppedImage);
              }, 250);
              this.img = "argazkiakBadago"
            });
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            let options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              targetHeight: 500,
              targetWidth: 500,
              correctOrientation: true
            };
            this.camera.getPicture(options).then(filePath => {
              this.croppedImage = 'data:image/jpeg;base64,' + filePath;
              alert(this.croppedImage);
              setTimeout(() => {
                document.getElementById('image').setAttribute('src', this.croppedImage);
              }, 250);
              this.img = "argazkiakBadago"
            });
          }
        }
      ]
    });
    alertDialog.present();
  }

  ordenagailuanArgazkiakIgo(e){
    let files = e.target.files;
    this.img = files[0]
    

    var reader = new FileReader();
    reader.onload =this.ordenagailuArgazkiaBase64.bind(this);
    reader.readAsBinaryString(this.img);
  }

  ordenagailuArgazkiaBase64(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.croppedImage= 'data:image/jpeg;base64,' + btoa(binaryString);
    
    
    document.getElementById('image').setAttribute('src', this.croppedImage);
   }

  formSubmit() {
    let zerbUid = this.firebaseZerbitzua.getErbabiltzaileId()

    if (zerbUid.substring(0, 6) == 'admin-') {
      this.data = {
        id: zerbUid.substring(6),
        image: this.croppedImage,
        kategoria: this.kategoria
      }
    } else {
      this.data = {
        id: zerbUid,
        image: this.croppedImage,
        kategoria: this.kategoria
      }
    }

    this.firebaseZerbitzua.createKategoria(this.data)
    this.router.navigate(["/kategoriaSortu"]);
    this.router.navigate(["/kategoriak"]);
  }
}
