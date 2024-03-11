import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNzIcons } from './icons-provider';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzI18n(es_ES), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations(), provideStore(), provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideNzIcons()]
};
