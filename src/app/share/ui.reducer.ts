/*
   ui reducer

*/

import * as fromUI from './ui.actions';


export interface UiState {
   isLoading: boolean;
}

const initialState: UiState = {
   isLoading: false
};

export function uiReducer(state = initialState, action: fromUI.Actions ): UiState {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING : {
            return {
                isLoading: true
            };
        }

        case fromUI.DESACTIVAR_LOADING : {
            return {
                isLoading: false
            };
        }

        default: {
            return state;
        }
    }
}
