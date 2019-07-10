import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenarPorTipo'
})
export class OrdenarPorTipoPipe implements PipeTransform {

  transform( items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort( (a, b) => {
      return a.tipo === 'ingreso' ? -1 : 1;
      // if ( a.tipo === 'ingreso') {
      //   return -1;
      // } else {
      //   return 1;
      // }
    });
  }

}
