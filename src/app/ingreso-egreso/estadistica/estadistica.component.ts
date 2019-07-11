import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit , OnDestroy{
  ingresos: number;
  egresos: number;

  cantIngresos: number;
  cantEgresos: number;

  private ingresoEgresoSubscription: Subscription = new Subscription();

  // public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  // public doughnutChartData: MultiDataSet = [];
  // public doughnutChartType: ChartType = 'doughnut';


  constructor( private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.ingresoEgresoSubscription = this.store.select('ingresoEgreso')
        .subscribe(ingresoEgreso => {
          this.contarMovimientos(ingresoEgreso.items);
        });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  contarMovimientos(items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.cantIngresos = 0;
    this.egresos = 0;
    this.cantEgresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso') {
        this.cantIngresos ++;
        this.ingresos += item.monto;
      } else  {
        this.cantEgresos ++;
        this.egresos += item.monto;
      }
    });

  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
