

/* ingreso-egreso reducer */


import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const initialState: IngresoEgresoState = {
    items : []
};

const reducer = createReducer(
    initialState,
    on(fromIngresoEgreso.setItemsAction, (state, { items }) => (
        {items: [
            ...items.map(unItem => {
                return {
                    ...unItem
                };
            })
        ]}

    ) ),

    on(fromIngresoEgreso.unsetItemsAction, (state) => ({ items: [] }))
);


export function ingresoEgresoReducer(state: IngresoEgresoState | undefined, action: Action) {
    return reducer(state, action);
}

/* 
            items: [
                ...param.items.map(unItem => {
                    return {
                        ...unItem
                    };
                })
            ]

*/ 