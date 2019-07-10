import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { filter, map } from 'rxjs/operators';
import { setItemsAction, unsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private ingresoEgresoItemsSubscription: Subscription = new Subscription();
  private ingresoEgresoListenerSubscription: Subscription = new Subscription();

  constructor( private afDb: AngularFirestore,
              private authServie: AuthService,
              private store: Store<AppState>) { }

  // initIngresoEgresoListener() {
  //   this.ingresoEgresoListenerSubscription = this.store.select('auth')
  //     .pipe(
  //       filter(auth => auth.user != null)
  //     )
  //     .subscribe( auth => {
  //       this.ingresoEgresoItems(auth.user.uid);
  //     });
  // }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .subscribe( auth => {
        if (auth.user != null) {
          this.ingresoEgresoItems(auth.user.uid);
        } else {
          this.clearItemsData();
        }
      });
  }


  private ingresoEgresoItems( uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDb.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map( doc => {
            return {
              uid: doc.payload.doc.id,  // doc.payload/doc tiene toda la data
              ...doc.payload.doc.data() // data() es un metodo
            };
          });
        })
      )
      .subscribe( (coleccion: any[]) => {
          this.store.dispatch(setItemsAction({ items: coleccion}));
      });
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const user = this.authServie.getUser();
    return this.afDb.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso( uid: string ) {
    const user = this.authServie.getUser();
    return this.afDb.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
          .delete();
  }

  private clearItemsData() {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(unsetItemsAction());
  }
  cancelarSubscriptions() {
    this.clearItemsData();
    // this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
  }

}
