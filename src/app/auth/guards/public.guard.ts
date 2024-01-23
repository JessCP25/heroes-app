
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const PublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/');
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

export const canMatch: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigateByUrl('/auth/login');
    })
  );
};
