import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.action';
import { UsuarioModel } from '../../models/usuario.model';

export interface State {
  user: UsuarioModel;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer<any, any>(
  initialState,
  on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(actions.unsetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
