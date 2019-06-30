import { User } from './user.model';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromAuth from './auth.actions';



export interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: null
};


const reducer = createReducer(
    initialState,
    on(fromAuth.setUserAction, (state, user) => ({ ...user })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
