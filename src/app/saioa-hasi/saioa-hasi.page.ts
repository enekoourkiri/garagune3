import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-saioa-hasi',
  templateUrl: './saioa-hasi.page.html',
  styleUrls: ['./saioa-hasi.page.scss'],
})

export class SaioaHasiPage implements OnInit {

  erabiltzaile: string = ""
  pasahitza: string = ""
  isAdmin: boolean;


  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public route: Router,
    public firebaseDbService: FirebaseDbService) { }

  ngOnInit() {
  }

  async login() {
    const { erabiltzaile, pasahitza } = this
    this.firebaseDbService.admin(erabiltzaile, pasahitza)
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(erabiltzaile + "@gmail.com", pasahitza)

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .firestore()
            .doc(`/erabiltzaileak/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              this.isAdmin = userProfileSnapshot.data().isAdmin;
              if (this.isAdmin) {
                this.route.navigate(['/erabiltzaileakIkusi'])
              } else {
                this.firebaseDbService.erbabiltzaileId(user.uid)
                this.route.navigate(['/kategoriak'])
              }
            });
        }
      });

    } catch (err) {
      console.dir(err)
      this.showAlert("Error", "No se ha encontrado ningún usuario con esta contraseña")
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
