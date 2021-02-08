import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {

  katId;
  erabilId;
  adminErabilId;
  arrayArgazkiak: any = [];
  arrayTextua: any = [];

  adminIzena
  adminPas

  constructor(public afs: AngularFirestore, public route: Router) { }

  createErregistroan(email, idMonitore) {
    let currentUser = firebase.auth().currentUser;
    this.afs.collection("erabiltzaileak").doc(currentUser.uid).set({
      email: email,
      isAdmin: false,
      userEdit: false,
      argazkia: '../../assets/argazkiak/profila.png',
      idMonitore: idMonitore
    })
  }

  erabiltzaileaEditatu(objetua) {
    this.afs.collection("erabiltzaileak").doc(objetua.id).set({
      email: objetua.email,
      isAdmin: objetua.isAdmin,
      userEdit: objetua.userEdit,
      argazkia: objetua.argazkia,
      idMonitore: objetua.idMonitore
    })
  }


  createKategoria(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('erabiltzaileak').doc(value.id).collection('tablero').add({
        image: value.image,
        kategoria: value.kategoria
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createPiktrograma(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('erabiltzaileak').doc(value.uid).collection('tablero').doc(value.id).collection('piktogramak').add({
        argazkia: value.argazkia,
        izena: value.izena
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }
  createPiktrogramaGenerala(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('general').doc(value.id).collection('piktogramak').add({
        argazkia: value.argazkia,
        izena: value.izena
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  admin(izena, pas) {
    this.adminIzena = izena
    this.adminPas = pas
  }
  getAdmin() {
    return this.adminIzena, this.adminPas
  }

  kategoriaId(id) {
    this.katId = id
  }
  getKategoriaId() {
    return this.katId
  }

  erbabiltzaileId(id) {
    this.erabilId = id
  }
  getErbabiltzaileId() {
    return this.erabilId;
  }

  adminErbabiltzaileId(id) {
    this.adminErabilId = id
  }
  getAdminErbabiltzaileId() {
    return this.adminErabilId;
  }

  arrayPush(text, argazkia) {
    this.arrayArgazkiak.push(argazkia);
    this.arrayTextua.push(text);
  }

  getArrayArgazkia() {
    return this.arrayArgazkiak;
  }

  getArrayTextu() {
    return this.arrayTextua;
  }

  arrayAzkenaBorratu() {
    this.arrayArgazkiak.splice(-1, 1)
    this.arrayTextua.splice(-1, 1)
  }

  arrayakGarbitu() {
    this.arrayArgazkiak = [];
    this.arrayTextua = [];
  }

  arrayPiktogramaBorratu(argazkia) {
    for(var i = 0;i<this.arrayArgazkiak.length;i++) {
      if(this.arrayArgazkiak[i]== argazkia){
          this.arrayArgazkiak.splice(i--, 1)
          this.arrayTextua.splice(i--, 1)
      }
   }  
  }


  isLogged() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        return true
      } else {
        return false
      }
    });
  }


  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }
}