import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserService } from './services/user.service';
import { CardComponent } from 'shared-ui';

export type DashboardView = 'home' | 'users' | 'reports' | 'settings';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, UserListComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentView: DashboardView = 'home';
  username = 'Guest';
  totalUsers = 0;

  readonly statCards: StatCard[] = [
    { title: 'Total Users',     value: 0,       icon: '👥', color: '#1565c0' },
    { title: 'Active Sessions', value: 12,      icon: '🔄', color: '#388e3c' },
    { title: 'Departments',     value: 4,       icon: '🏢', color: '#f57c00' },
    { title: 'Roles',           value: 4,       icon: '🛡',  color: '#7b1fa2' },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.username = this.resolveUsername();
    this.userService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
      this.statCards[0].value = users.length;
    });
  }

  navigateTo(view: string): void {
    this.currentView = view as DashboardView;
  }

  onLogout(): void {
    localStorage.removeItem('rib_user');
    localStorage.removeItem('rib_auth');
    this.router.navigate(['/login']);
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  private resolveUsername(): string {
    try {
      const raw = localStorage.getItem('rib_user');
      if (!raw) return 'Guest';
      const user = JSON.parse(raw) as { name?: string; email?: string };
      return user.name || user.email?.split('@')[0] || 'Guest';
    } catch {
      return 'Guest';
    }
  }
}

