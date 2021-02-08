import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-erabiltzaileak-ikusi',
  templateUrl: './erabiltzaileak-ikusi.page.html',
  styleUrls: ['./erabiltzaileak-ikusi.page.scss'],
})
export class ErabiltzaileakIkusiPage implements OnInit {

  erabiltzaileak: { id: string, argazkia: string, isAdmin: boolean, userEdit: boolean, idMonitore: string }[];
  izen: { izena: string }[];
  dana;
  isAdmin;
  isAdminId;
  monitoreId;
  izenak: string[] = [];

  constructor(
    public afs: AngularFirestore,
    public firebaseDbService: FirebaseDbService,
    public route: Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController) { }

  async logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      location.reload()
      this.route.navigate(['/erabiltzaileakIkusi'])
    })
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/erabiltzaileak/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.isAdminId = userProfileSnapshot.data().idMonitore;
            this.isAdmin = userProfileSnapshot.data().isAdmin;
          });
      }
    });

    this.afs.collection('/erabiltzaileak').snapshotChanges().subscribe
      (resa => {
        if (resa) {
          this.erabiltzaileak = resa.map(x => {
            return {
              id: x.payload.doc.id,
              email: x.payload.doc.data()['email'],
              argazkia: x.payload.doc.data()['argazkia'],
              isAdmin: x.payload.doc.data()['isAdmin'],
              userEdit: x.payload.doc.data()['userEdit'],
              idMonitore: x.payload.doc.data()['idMonitore']
            }
          })
          this.izenaLortu()
        }
      });
  }

  ionViewWillEnter(){
    location.reload
  }

 

  izenaLortu() {
    this.dana = this.erabiltzaileak
    for (let x of this.dana) {
      let izena = (x.email).split('@')
      this.izenak.push(izena[0]) // BEDINAK DIRA  x['email']
    }
  }

  erabiltzaileAukeratu(id) {
    if (this.isAdmin) {
      this.firebaseDbService.erbabiltzaileId('admin-' + id)

      this.route.navigate(['/kategoriak'])
    } else {
      this.firebaseDbService.erbabiltzaileId(id)
      this.route.navigate(['/kategoriak'])
    }
  }

  erabiltzaileaEditatu(objetua) {
    this.route.navigate(['erabiltzaileaEditatu/' + objetua.id])
  }
  async pasahitzaAldatu() {
    const alerta = this.alert.create({
      header: "Cambiar contraseña",
      subHeader: "¿Seguro que quieres cambiar la contraseña?",
      inputs: [
        {
          type: 'password',
          name: 'pas1',
          placeholder: 'Nueva contraseña',
        },
        {
          type: 'password',
          name: 'pas2',
          placeholder: 'Repite la contraseña',
        }
      ],
      buttons: [
        {
          text: "Guardar",
          handler: (alertData) => {
            if (alertData.pas1 == alertData.pas2 && alertData.pas1.length >= 6) {
              firebase.auth().currentUser.updatePassword(alertData.pas1)
              alert("Se ha cambiado la contraseña")
            } else {
              alert("Las contraseña no son iguales,o la longitud no es correcta (minimo 6 caracteres)")
            }
          }
        },
        {
          text: "No guardar"
        }
      ]
    })
    alerta.then((alerta) => {
      alerta.present()
    })
  }
}
