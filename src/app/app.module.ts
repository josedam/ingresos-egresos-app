import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Reducers
import { reducers } from './reducers';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { PageNotFoundComponent } from './share/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    // IngresoEgresoModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) /* , { metaReducers }) */

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
