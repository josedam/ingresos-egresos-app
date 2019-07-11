import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromUI from '../share/ui.reducer';
import * as fromAuth from '../auth/auth.reducer';
// import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
  // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};


// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
