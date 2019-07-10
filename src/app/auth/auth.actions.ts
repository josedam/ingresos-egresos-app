import { props, createAction } from '@ngrx/store';
import { User } from './user.model';


export const setUserAction = createAction('[Auth] Set User', props<{user: User}>());
export const resetUserAction = createAction('[Auth] Reset User');
