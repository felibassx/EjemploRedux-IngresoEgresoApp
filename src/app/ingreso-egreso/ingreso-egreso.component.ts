import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { UtilsService } from '../services/utils.service';
import { Store } from '@ngrx/store';
import * as ui from '../redux-config/ui-store/ui.action';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private utilsServices: UtilsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select('ui')
      .subscribe(({ isLoading }) => {
        this.cargando = isLoading;
      });
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    const { descripcion, monto } = this.ingresoForm.value;

    this.store.dispatch(ui.isLoading());
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.ingresoForm.reset();
        this.utilsServices.mensajeExito(
          'Ingreso creado',
          'El registro fue agregado con éxito'
        );
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        this.utilsServices.mensajeError('Error al crear el registro', error);
      });
  }
}
