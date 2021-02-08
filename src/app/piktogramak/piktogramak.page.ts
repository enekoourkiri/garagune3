import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import { TtsService } from '../zerbitzuak/tts.service';
import { AlertController } from '@ionic/angular';

import { IonContent } from '@ionic/angular';



@Component({
  selector: 'app-piktogramak',
  templateUrl: './piktogramak.page.html',
  styleUrls: ['./piktogramak.page.scss'],
})
export class PiktogramakPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  dummyList: any;

  isAdmin: boolean;
  userEdit: boolean;
  fireStoreList
  id
  kategoriaIzena;
  erailtzaileId;
  adminErailtzaileId;

  // records: { image: string, izena: string }[];
  records: any[];
  addrecord: { image: string, izena: string };

  idea: { id: string }[];

  constructor(
    private firebaseSevice: FirebaseDbService,
    public route: ActivatedRoute,
    private _stts: TtsService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private alertCtrl: AlertController,
    public afs: AngularFirestore,
    public direbaeStorage: AngularFireStorage,
    public modalController: ModalController,
    public firebaseDbService: FirebaseDbService,
    private location: Location) { }

  ngOnInit() {
    if (this.firebaseDbService.getErbabiltzaileId().substring(0, 6) == 'admin-') {
      this.erailtzaileId = firebase.auth().currentUser.uid
      this.adminErailtzaileId = this.firebaseDbService.getErbabiltzaileId().substring(6)
    } else {
      this.erailtzaileId = this.firebaseDbService.getErbabiltzaileId()
      this.adminErailtzaileId = this.firebaseDbService.getErbabiltzaileId()
    }

    firebase
      .firestore()
      .doc(`/erabiltzaileak/${this.erailtzaileId}`)
      .get()
      .then(userProfileSnapshot => {
        this.isAdmin = userProfileSnapshot.data().isAdmin;
        this.userEdit = userProfileSnapshot.data().userEdit;
        this.konpronazioa()
      });
  }

  goBack(): void {
    this.router.navigate(['kategoriak'])
  }

  konpronazioa() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id.substring(0, 2) == 'g-') {

      this.afs.collection('/general').doc(this.id.substring(2)).valueChanges().subscribe(res => {
        this.kategoriaIzena = res['izena']
      })

      if (this.isAdmin) {
        this.afs.collection('/general/' + this.id.substr(2) + '/piktogramak').snapshotChanges().subscribe
          (resa => {
            if (resa) {
              this.records = resa.map(x => {
                return {
                  id: 'g-' + x.payload.doc.id,
                  argazkia: x.payload.doc.data()['argazkia'],
                  izena: x.payload.doc.data()['izena']
                }

              })
            }
          });
        this.firebaseSevice.kategoriaId(this.id)
      } else {
        this.afs.collection('/general/' + this.id.substr(2) + '/piktogramak').snapshotChanges().subscribe
          (resa => {
            if (resa) {
              this.records = resa.map(x => {
                return {
                  id: 'g-' + x.payload.doc.id,
                  argazkia: x.payload.doc.data()['argazkia'],
                  izena: x.payload.doc.data()['izena']
                }

              })
            }
          });
        this.firebaseSevice.kategoriaId(this.id)
      }
    } else {
      this.afs.collection('/erabiltzaileak').doc(this.adminErailtzaileId+"/tablero/"+this.id).valueChanges().subscribe(res => {
        this.kategoriaIzena = res['kategoria']
      })

      if (this.isAdmin) {
        this.afs.collection('/erabiltzaileak/' + this.adminErailtzaileId + '/tablero/' + this.id + '/piktogramak').snapshotChanges().subscribe
          (resa => {
            if (resa) {
              this.records = resa.map(x => {
                return {
                  id: x.payload.doc.id,
                  argazkia: x.payload.doc.data()['argazkia'],
                  izena: x.payload.doc.data()['izena']
                }
              })
            }
          });
        this.firebaseSevice.kategoriaId(this.id)
      } else {
        this.afs.collection('/erabiltzaileak/' + this.adminErailtzaileId + '/tablero/' + this.id + '/piktogramak').snapshotChanges().subscribe
          (resa => {
            if (resa) {
              this.records = resa.map(x => {
                return {
                  id: x.payload.doc.id,
                  argazkia: x.payload.doc.data()['argazkia'],
                  izena: x.payload.doc.data()['izena']
                }
              })
            }
          });
        this.firebaseSevice.kategoriaId(this.id)
      }
    }
  }

  hablar(zer: string, argazkia) {
    this._stts.discurso(zer);
    this.firebaseDbService.arrayPush(zer, argazkia)
    this.router.navigate(['kategoriak'])
  }

  ezabatu(pikId, argazkia) {
    const alerta = this.alertCtrl.create({
      header: "Borrar",
      subHeader: "¿Seguro que quieres borrar el pictograma?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            if (pikId.substring(0, 2) == 'g-') {
              this.afs.doc<any>('general/' + this.kategoriaIzena + '/piktogramak/' + pikId.substring(2)).delete();
              this.firebaseDbService.arrayPiktogramaBorratu(argazkia)
            } else {
              this.afs.doc<any>('erabiltzaileak/' + this.adminErailtzaileId + '/tablero/' + this.id + '/piktogramak/' + pikId).delete();
              this.firebaseDbService.arrayPiktogramaBorratu(argazkia)
            }
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

  gora(){
    this.content.scrollToTop(500);
  }
}
