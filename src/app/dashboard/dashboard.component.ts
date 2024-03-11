import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userImagen: string = '';
  fecha: string = this.getFormattedDate();
  hora: string = this.getFormattedTime();
  textoMotivacional: string = `Te encuentras en una nueva etapa profesional. Estamos seguros de que tendrás éxito y que esta empresa será un gran apoyo para ti.`;
  textoCerrarSesion: string = 'Cerrar sesión';
  textoDespedida: string = `Recuerda que tienes todo el potencial para alcanzar tus metas. ¡Buena suerte en tu día!`;

  constructor(private router: Router, private messageService: NzMessageService) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      this.messageService.error('Usuario no autenticado. Por favor, inicia sesión.');
      this.router.navigate(['/login']);
      return;
    }

    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = userObj.name || 'Usuario no identificado';
    this.userImagen = userObj.imagen || 'data:image/jpeg;base64,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';
    

  }

  ngOnInit(): void {
    this.launchConfetti();
    setInterval(() => {
      this.fecha = this.getFormattedDate();
      this.hora = this.getFormattedTime();
    }, 1000);
  }

  getFormattedDate(): string {
    return new Date().toLocaleDateString('es-MX', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  getFormattedTime(): string {
    return new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    this.messageService.success('Sesión cerrada exitosamente.');
    this.router.navigate(['/login']);
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
