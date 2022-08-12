import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../../models/usuario.model';

export const setUser = createAction(
  '[Auth Component] setUser',
  props<{ user: UsuarioModel }>()
);

export const unsetUser = createAction('[Auth Component] unsetUser');
