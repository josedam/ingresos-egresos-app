import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nombre-usuario',
  templateUrl: './nombre-usuario.component.html',
  styles: []
})
export class NombreUsuarioComponent implements OnInit, OnDestroy {

  nombreUsuario: string;

  private authSubcription: Subscription = new Subscription();

  constructor(
        private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSubcription = this.store.select('auth')
      .pipe( filter( auth => auth.user !== null))
      .subscribe(auth => this.nombreUsuario = auth.user.nombre);
  }

  ngOnDestroy() {
    this.authSubcription.unsubscribe();
  }
}
