import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';


/* ingreso-egreso actions */


export const unsetItemsAction = createAction('[ingreso egreso] Unset items');

export const setItemsAction = createAction('[ingreso egreso] Set items', props<{items: IngresoEgreso[]}>());
