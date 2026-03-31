import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        // Public: already-authenticated users are sent straight to dashboard
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          loadRemoteModule('login', './Component').then((m) => m.AppComponent),
      },
      {
        // Protected: unauthenticated users are redirected to login
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          loadRemoteModule('user-dashboard', './Component').then((m) => m.AppComponent),
      },
      {
        path: 'notfound',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/notfound'
  }
];

