import { ActionReducerMap } from '@ngrx/store';
import * as ui from './redux-config/ui-store/ui.reducer';
import * as auth from './redux-config/auth-store/auth.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
};
