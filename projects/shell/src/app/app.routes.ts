import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { AppLayoutComponent } from './layout/app.layout.component';

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
        path: 'login',
        loadComponent: () =>
          loadRemoteModule('login', './Component').then((m) => m.AppComponent),
      },
      {
        path: 'dashboard',
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

