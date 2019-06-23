import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private reouter: Router,
               private afDB: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(fbUser => {
        const user: User = {
          uid: fbUser.user.uid,
          nombre: nombre,
          email: fbUser.user.email
        };
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then( () => {
            this.reouter.navigate(['/']);
          })
          .catch(error => {
            console.log(error);
            Swal.fire('Error en Registro DB', error.message, 'error');
          });

      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error en Registro', error.message, 'error');
      });
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(fbUser => {
        this.reouter.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error en Login', error.message, 'error');
      });
  }

  logout() {
    this.reouter.navigate(['/login']);
    this.afAuth.auth.signOut()
    .catch(error => {
      Swal.fire('Error en LogOut', error.message, 'error');
    });
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      map (fbUser => {
        if (fbUser == null) {
          this.reouter.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }
}
