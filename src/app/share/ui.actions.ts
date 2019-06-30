import { Action, createAction } from '@ngrx/store';

/*
  ui.actions  ACciones del UI

*/


export const ACTIVAR_LOADING = '[UI] ACTIVAR_LOADING';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export const DESACTIVAR_LOADING = '[UI] DESCTIVAR_LOADING';

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;

    // constructor(public payload: payloadType) { }
}

// export const DesactivarLoading = createAction('[UI] DesactivarLoading');
// export const ActivarLoading = createAction('[UI] ActivarLoading');

export type Actions = ActivarLoadingAction | DesactivarLoadingAction;

