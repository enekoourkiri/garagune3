import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';





const routes: Routes = [
  {
    path: 'kategoriak',
    children: [
      {
        path: '',
        loadChildren: () => import('./kategoriak/kategoriak.module').then( m => m.KategoriakPageModule)
      },
      {
        path: 'kategoriak/:id',
        loadChildren: () => import('./piktogramak/piktogramak.module').then( m => m.PiktogramakPageModule)
      } 
    ]
  },
  {
    path: 'izenaEman',
    children:[
      {
        path:'',
        loadChildren: () => import('./izena-eman/izena-eman.module').then( m => m.IzenaEmanPageModule)
      }

    ]
    
  },
  {
    path: 'saioaHasi',
    children:[
      {
        path:'',
        loadChildren: () => import('./saioa-hasi/saioa-hasi.module').then( m => m.SaioaHasiPageModule)
      }

    ]
    
  },
  {
    path: 'kategoriaSortu',
    children:[
      {
        path:'',
        loadChildren: () => import('./kategoria-sortu/kategoria-sortu.module').then( m => m.KategoriaSortuPageModule)
      }

    ]
    
  },
  {
    path: 'piktogramaSortu',
    children:[
      {
        path:'',
        loadChildren: () => import('./piktogramak-sortu/piktogramak-sortu.module').then( m => m.PiktogramakSortuPageModule)
      }

    ]
    
  },
  {
    path: 'erabiltzaileakIkusi',
    children:[
      {
        path:'',
        loadChildren: () => import('./erabiltzaileak-ikusi/erabiltzaileak-ikusi.module').then( m => m.ErabiltzaileakIkusiPageModule)
      }

    ]
    
  },
  {
    path: 'erabiltzaileaEditatu/:id',
    children:[
      {
        path:'',
        loadChildren: () => import('./erabiltzaileak-editatu/erabiltzaileak-editatu.module').then( m => m.ErabiltzaileakEditatuPageModule)
      }

    ]
    
  },
  {
    path: '',
    redirectTo: '/erabiltzaileakIkusi',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
