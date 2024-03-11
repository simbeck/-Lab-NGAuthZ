import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal'; // Importa NzModalModule

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NzModalModule // Asegúrate de importar NzModalModule aquí
    // Otros módulos necesarios
  ]
})
export class DashboardModule { }
