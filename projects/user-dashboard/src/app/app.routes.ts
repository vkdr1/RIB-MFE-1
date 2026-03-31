import { Routes } from '@angular/router';

/**
 * User-Dashboard internal routes.
 *
 * These are used when the app runs in standalone mode (port 4202).
 * When loaded as a federated remote by the shell, the AppComponent manages
 * view navigation through internal state rather than URL routing.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    // Inline component reference to avoid circular imports in federation context
    loadComponent: () =>
      import('./app.component').then((m) => m.AppComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

