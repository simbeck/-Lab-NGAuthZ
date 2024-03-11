import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  // Método para obtener los usuarios desde un archivo JSON.
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/assets/users.json');
  }

  // Método para verificar las credenciales de los usuarios.
  checkCredentials(email: string, password: string): Observable<any | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }

  // Método para cerrar la sesión del usuario.
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Método para proteger las rutas.
  canActivate(): boolean {
    if (localStorage.getItem('isAuthenticated')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
