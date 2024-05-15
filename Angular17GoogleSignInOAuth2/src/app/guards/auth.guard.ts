import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStoreProvider } from '../signal-stores/auth-store';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthStoreProvider);
  const router = inject(Router);

  if (authService.getToken())
    return true;
  else
    return router.navigate(['unauthorized'])
};
