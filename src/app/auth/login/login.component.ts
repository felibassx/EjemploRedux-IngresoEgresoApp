import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { AppState } from '../../app.reducer';
import * as ui from '../../redux-config/ui-store/ui.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    // this.utilsService.loading('espere por favor...');

    const { correo, password } = this.loginForm.value;
    this.authService
      .loginUsuario(correo, password)
      .then((userLogin) => {
        // this.utilsService.cerrarMensaje();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        this.utilsService.mensajeError('Error de Autenticación', error.message);
      });
  }
}
