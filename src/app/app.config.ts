import {
  ApplicationConfig, inject, PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {apiInterceptor} from './api-interceptor';
import {API_URL} from './constants';
import {authInterceptor} from './auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: API_URL, useValue: 'http://localhost:3000/'},
    provideAppInitializer(() => {
      const url = inject(API_URL);
      const http = inject(HttpClient);
      const plId = inject(PLATFORM_ID);

      if (isPlatformServer(plId)) return Promise.resolve();
      return firstValueFrom(http.get(`${url}csrf-token`));
    }),
    provideHttpClient(
      withInterceptors([apiInterceptor, authInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
