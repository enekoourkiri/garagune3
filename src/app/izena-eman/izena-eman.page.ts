import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-izena-eman',
  templateUrl: './izena-eman.page.html',
  styleUrls: ['./izena-eman.page.scss'],
})
export class IzenaEmanPage implements OnInit {

  erabiltzaile: string = ""
  pasahitza: string = ""
  bpasahitza: string = ""
  idMonitore: string = ""

  constructor(
    private firebaseSevice: FirebaseDbService,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public route: Router) { }

  ngOnInit() { }

  async register() {
    const { erabiltzaile, pasahitza, bpasahitza } = this

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/erabiltzaileak/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.idMonitore = userProfileSnapshot.data().idMonitore;
          });
      }
    });

    if (pasahitza !== bpasahitza) {
      this.showAlert("Error", "Las contraseñas no son iguales")
      return console.error("Las contraseñas no son iguales")
    }
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(erabiltzaile.trim() + "@gmail.com", pasahitza)
      this.showAlert("Registrado", "Tus datos se han guardado correctamente, estas son las categorias generales,si vas atras veras la lista de los usuarios")
      this.firebaseSevice.createErregistroan(erabiltzaile + "@gmail.com", this.idMonitore);
      this.firebaseSevice.erbabiltzaileId(res.user.uid)
      this.route.navigate(['/kategoriak'])
    } catch (error) {
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }
}
