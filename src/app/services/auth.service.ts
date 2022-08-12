import { Injectable } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../redux-config/auth-store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new UsuarioModel(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  initAuthListener() {
    this.auth.authState.subscribe((fbUser: UserInfo) => {
      if (fbUser) {
        this.userSubscription = this.firestore
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((userStore: any) => {
            const user = UsuarioModel.fromFirebase(userStore);
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
      }
    });
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
