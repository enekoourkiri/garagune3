import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import '@firebase/storage'

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';



export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-erabiltzaileak-editatu',
  templateUrl: './erabiltzaileak-editatu.page.html',
  styleUrls: ['./erabiltzaileak-editatu.page.scss'],
})



export class ErabiltzaileakEditatuPage implements OnInit {
  argazkia
  isAdmin
  userEdit
  idMonitore
  id
  email
  img
  adminIzena
  adminPas

  botoia
  inputa

  picNombre: string;
  kategoria: string;
  izena: string;

  croppedImage: string;
  percent;
  isUploadStart = false;

  constructor(
    public afs: AngularFirestore, 
    private route: ActivatedRoute, 
    public router: Router,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    private alertCtrl: AlertController,
    private firebaseZerbitzua: FirebaseDbService,
    public alert: AlertController,
    private camera: Camera) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.afs.collection('/erabiltzaileak').doc(this.id).valueChanges().subscribe(res => {
      this.croppedImage = res['argazkia']
      this.email = res['email']
      this.isAdmin = res['isAdmin']
      this.userEdit = res['userEdit']
      this.idMonitore = res['idMonitore']
    })

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

  goBack(): void {
    this.router.navigate(['erabiltzaileakIkusi'])
  }

  ezabatu(pikId) {
    this.adminIzena, this.adminPas = this.firebaseZerbitzua.getAdmin()
    const alerta = this.alertCtrl.create({
      header: "Borrar",
      subHeader: "¿Seguro que quieres borrar el usuario?",
      inputs: [
        {
          type: 'text',
          name: 'izena',
          placeholder: 'Nombre de usuario que quieres borrar',
        },
        {
          type: 'password',
          name: 'pas',
          placeholder: 'Contraseña',
        }
      ],
      buttons: [
        {
          text: "Si",
          handler: (alertData) => {
            this.afs.doc<any>("erabiltzaileak/" +pikId).delete()
            firebase.auth().signInWithEmailAndPassword(alertData.izena+"@gmail.com", alertData.pas).then(()=>{
              firebase.auth().currentUser.delete()
              this.berrizSartu()
            })          
          }
        },
        {
          text: "No"
        }
      ]
    })
    alerta.then((alerta) => {
      alerta.present()
    })
  }

  berrizSartu(){
    firebase.auth().signInWithEmailAndPassword(this.adminIzena+"@gmail.com", this.adminPas)
    this.router.navigate(['erabiltzaileakIkusi'])
  }

  update(e: FileList) {
    this.img = e.item(0);
  }

  async uploadFile() {
    const alertDialog = await this.alert.create({
      header: 'Elija una imagen',
      buttons: [
        {
          text: 'Camara',
          handler: () => {
            let options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.CAMERA,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              targetHeight: 180,
              targetWidth: 275,
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
              targetHeight: 180,
              targetWidth: 275,
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
    let data = {
      id: this.id,
      email: this.email,
      argazkia: this.croppedImage,
      isAdmin: this.isAdmin,
      userEdit: this.userEdit,
      idMonitore: this.idMonitore
    }
    this.firebaseZerbitzua.erabiltzaileaEditatu(data)
    this.goBack()
  }
}
