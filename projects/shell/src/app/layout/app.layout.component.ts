import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppTopbarComponent } from './component/app.topbar.component';
import { AppSidebarComponent } from './component/app.sidebar.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AppTopbarComponent, AppSidebarComponent],
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.scss']
})
export class AppLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /** Whether the user is authenticated — drives sidebar visibility */
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  /** User-controlled sidebar toggle (only relevant when authenticated) */
  sidebarVisible = true;

  constructor() {
    // Keep auth signal up-to-date on every navigation
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.authService.checkAuth());
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

