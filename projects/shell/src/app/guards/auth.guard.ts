import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protects routes that require authentication.
 * Redirects unauthenticated users to /login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkAuth()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

/**
 * Prevents authenticated users from accessing the login page.
 * Redirects already-authenticated users to /dashboard.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.checkAuth()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};

