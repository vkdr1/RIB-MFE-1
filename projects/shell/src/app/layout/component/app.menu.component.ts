import { Component, inject, computed } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /** Reactive: true only after a successful login writes to localStorage */
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  /** Items always visible to authenticated users */
  readonly authenticatedItems: MenuItem[] = [
    { label: 'User Dashboard', icon: '📊', routerLink: '/dashboard' }
  ];

  constructor() {
    // Re-check auth state after every navigation so the menu updates
    // immediately when the login MFE navigates to /dashboard.
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.authService.checkAuth());
  }
}

