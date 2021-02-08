import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/firestore';
import '@firebase/storage'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Kategoria } from '../interfazeak/kategoria';
import { ModalController } from '@ionic/angular';
import { FirebaseDbService } from '../zerbitzuak/firebase-db.service';
import { TtsService } from '../zerbitzuak/tts.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-kategoriak',
  templateUrl: './kategoriak.page.html',
  styleUrls: ['./kategoriak.page.scss'],
})
export class KategoriakPage implements OnInit {

  storage = firebase.storage()
  arrayArgazki: any = [];
  arrayText: any = [];

  items = {} as Kategoria;
  isAdmin: boolean;
  userEdit: boolean;
  data: any;
  katArgazkia
  arg

  fireStoreList
  erailtzaileId;
  adminErailtzaileId;

  idea: { id: string }[];
  argazkiak: any;

  records: { id: string, image: string, kategoria: string }[];
  generala: { id: string, argazkiaKat: string, izenaKat: string }[];


  //private snapshotChangesSubscription: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private _stts: TtsService,
    public afs: AngularFirestore,
    public direbaeStorage: AngularFireStorage,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    public firebaseDbService: FirebaseDbService,
    private location: Location
  ) { }


  goBack(): void {
    this.location.back();
  }

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
        this.konprobazioa()
      });
  }

  konprobazioa() {
    if (this.isAdmin) {
      this.afs.collection('/erabiltzaileak').doc(this.adminErailtzaileId)
        .collection('tablero').snapshotChanges().subscribe
        (res => {
          if (res) {
            this.idea = res.map(e => {
              return {
                id: e.payload.doc.id,
              }

            })
          }
        });

      this.afs.collection('/erabiltzaileak/' + this.adminErailtzaileId + '/tablero').snapshotChanges().subscribe
        (resa => {
          if (resa) {
            this.records = resa.map(x => {
              return {
                id: x.payload.doc.id,
                image: x.payload.doc.data()['image'],
                kategoria: x.payload.doc.data()['kategoria']
              }

            })
          }
        });

      this.afs.collection('/general').snapshotChanges().subscribe
        (resaG => {
          if (resaG) {
            this.generala = resaG.map(x => {
              return {
                id: x.payload.doc.id,
                argazkiaKat: x.payload.doc.data()['argazkia'],
                izenaKat: x.payload.doc.data()['izena']
              }

            })
          }
        });

    } else {
      this.afs.collection('/erabiltzaileak').doc(this.adminErailtzaileId)
        .collection('tablero').snapshotChanges().subscribe
        (res => {
          if (res) {
            this.idea = res.map(e => {
              return {
                id: e.payload.doc.id,
              }

            })
          }
        });

      this.afs.collection('/erabiltzaileak/' + this.adminErailtzaileId + '/tablero').snapshotChanges().subscribe
        (resa => {
          if (resa) {
            this.records = resa.map(x => {
              return {
                id: x.payload.doc.id,
                image: x.payload.doc.data()['image'],
                kategoria: x.payload.doc.data()['kategoria']
              }

            })
          }
        });
    }

    this.afs.collection('/general').snapshotChanges().subscribe
      (resaG => {
        if (resaG) {
          this.generala = resaG.map(x => {
            return {
              id: x.payload.doc.id,
              argazkiaKat: x.payload.doc.data()['argazkia'],
              izenaKat: x.payload.doc.data()['izena']
            }

          })
        }
      });
  }

  ionViewWillEnter() {
    this.arrayArgazki = this.firebaseDbService.getArrayArgazkia()
  }

  argazkiaIkusi(argazkia) {
    var storage = firebase.storage()
    var storageRef = storage.ref()

    return storageRef.child(argazkia).getDownloadURL()
  }

  hablar(esp: string, id) {
    this._stts.discurso(esp);
    this.router.navigate(['kategoriak/kategoriak/' + id])
  }

  hitzeginArray(value) {
    this._stts.discurso(value);
  }

  hitzegin() {
    this.arrayText = this.firebaseDbService.getArrayTextu()
    this.hitzeginArray(this.arrayText)
  }
  azkenaBorratu() {
    this.firebaseDbService.arrayAzkenaBorratu()
  }

  arrayEzabatu() {
    this.firebaseDbService.arrayakGarbitu()
    this.arrayText = []
    this.arrayArgazki = []
  }

  hablarGeneral(esp: string, id) {
    this._stts.discurso(esp);
    let guid = "g-" + id
    this.router.navigate(['kategoriak/kategoriak/' + guid])
  }

  ezabatu(pikId) {
    const alerta = this.alertCtrl.create({
      header: "Borrar",
      subHeader: "¿Seguro que quieres borrar la categoría?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.fireStoreList = this.afs.doc<any>('erabiltzaileak/' + this.adminErailtzaileId + '/tablero/' + pikId).delete();
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

  atzera(){
    this.router.navigate(['/erabiltzaileakIkusi']).then(()=>{
      location.reload()
    })
  }

  
  hablarPiktogramak(zer: string, argazkia) {
    this._stts.discurso(zer);
    this.firebaseDbService.arrayPush(zer, argazkia)
    this.arrayArgazki = this.firebaseDbService.getArrayArgazkia()
  }
}

