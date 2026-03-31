import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Shell layout wraps only login & notfound — routes that don't own their own full layout
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
        path: 'notfound',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)
      }
    ]
  },
  {
    // Dashboard renders its own full layout (header + sidebar + content),
    // so it must sit outside AppLayoutComponent to avoid a double layout.
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      loadRemoteModule('user-dashboard', './Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    redirectTo: '/notfound'
  }
];

