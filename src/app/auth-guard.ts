import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {catchError, map} from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.fetchUser().pipe(
    map(() => true),
    catchError(() => {
      router.navigateByUrl('/login')
      return [false];
    })
  );
}
