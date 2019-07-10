import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../share/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  tipo: String = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  isLoading: Boolean = false;

  constructor( private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe( ui => this.isLoading = ui.isLoading);

    this.myForm = new FormGroup({
      'descripcion': new FormControl('', [Validators.required]),
      'monto': new FormControl(0, [Validators.min(1)])
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

grabarMovimiento() {
  this.store.dispatch(new ActivarLoadingAction());
 
  const ingresoEgreso = new IngresoEgreso({... this.myForm.value, tipo: this.tipo});
  this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.store.dispatch(new DesactivarLoadingAction());
      this.myForm.reset({ monto: 0 });
      Swal.fire(ingresoEgreso.descripcion, 'Creado Correctamente...', 'success');
    })
    .catch(error => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire(ingresoEgreso.descripcion, error, 'error');
      console.log(error);
    });

}

}
