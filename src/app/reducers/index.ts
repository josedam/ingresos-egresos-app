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

export interface AppState {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};


// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
