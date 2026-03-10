import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {tap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    tap({
      error: error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Clears the cookies and redirects to login
          authService.logout();
        }
      }
    })
  );
};
