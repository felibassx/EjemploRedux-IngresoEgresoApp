import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  mensajeExito(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  mensajeError(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  loading(titulo: string) {
    Swal.fire({
      title: titulo,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  cerrarMensaje() {
    Swal.close();
  }
}
