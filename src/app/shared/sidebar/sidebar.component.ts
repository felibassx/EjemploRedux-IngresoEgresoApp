import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => {
        this.utilsService.mensajeError('Error al cerrar sesión', error.message);
      });
  }
}
