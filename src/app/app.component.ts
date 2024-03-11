import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.handleNavigation();
  }

  handleNavigation(): void {
    // Observa los eventos de navegación para forzar la recarga si es necesario
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Forza la recarga en navegaciones específicas si se requiere
      // Implementa aquí la lógica específica si necesitas distinguir entre tipos de navegación
    });

    // Listener para el evento popstate
    window.onpopstate = () => {
      // Fuerza la recarga de la aplicación al detectar navegación hacia atrás/adelante
      window.location.reload();
    };
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    // Aquí puedes implementar cualquier lógica adicional antes de la recarga/unload
    // Por ejemplo, manejo de estados no guardados
  }
}
