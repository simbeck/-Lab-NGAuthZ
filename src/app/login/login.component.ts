import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MailOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { AuthService } from '../auth.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    NzTableModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: [MailOutline, LockOutline]
    },
    NzMessageService
  ]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  users: any[] = [];
  loginError: boolean = false; // Define la propiedad loginError aquí

  constructor(
    private router: Router,
    private message: NzMessageService,
    private authService: AuthService,
    private messageService: NzMessageService
  ) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      this.messageService.error('Usuario no autenticado. Por favor, inicia sesión.');
      
    }
  }


  ngOnInit(): void {
    this.loadUsers();
    this.logout();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.message.error('Error al cargar los usuarios.');
    });
  }
  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    //this.messageService.success('Sesión cerrada exitosamente.');
    this.router.navigate(['/login']);
  }


  login(): void {
    if (!this.email || !this.password) {
      this.message.error('Ingrese los datos de validación.');
      return;
    }

    this.authService.checkCredentials(this.email, this.password).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify({email: user.email, name: user.name, imagen: user.imagen}));
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        this.message.error('Credenciales incorrectas. Por favor, intenta de nuevo.');
      }
    }, error => {
      this.message.error('Error al intentar la autenticación.');
    });
  }
}
