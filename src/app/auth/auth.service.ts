import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

import { map } from 'rxjs/operators';
import { User } from './user.model';

import { ActivarLoadingAction, DesactivarLoadingAction } from '../share/ui.actions';
import { setUserAction, resetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private user: User;

  constructor( private afAuth: AngularFireAuth,
               private reouter: Router,
               private afDB: AngularFirestore,
               private store: Store<AppState>) { }

  initAuthListener() {
    this.userSubscription =  this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      if (fbUser) {
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((userObj: any) => {
            this.user = new User(userObj);
            this.store.dispatch(setUserAction({user: this.user}));
          });

      } else {
        this.clearUserData();
      }
    });
  }

  private clearUserData() {
    this.store.dispatch(resetUserAction());
    this.user = null;
  }

  doneAuthListener() {
    this.userSubscription.unsubscribe();
    this.clearUserData();
  }
  crearUsuario( nombre: string, email: string, password: string) {
    this.store.dispatch( new ActivarLoadingAction() );

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
            this.store.dispatch( new DesactivarLoadingAction() );
            this.reouter.navigate(['/']);
          })
          .catch(error => {
            console.log(error);
            this.store.dispatch( new DesactivarLoadingAction() );
            Swal.fire('Error en Registro DB', error.message, 'error');
          });

      })
      .catch(error => {
        console.log(error);
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire('Error en Registro', error.message, 'error');
      });
  }

  login( email: string, password: string) {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(fbUser => {
        this.store.dispatch( new DesactivarLoadingAction() );
        this.reouter.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire('Error en Login', error.message, 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut()
    .catch(error => {
      Swal.fire('Error en LogOut', error.message, 'error');
    });
    // this.store.dispatch(resetUserAction());
    this.reouter.navigate(['/login']);
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

  getUser() {
    return {... this.user};
  }
}
