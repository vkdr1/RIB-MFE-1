import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent {
  model: MenuItem[] = [
    {
      label: 'Login',
      icon: '🔐',
      routerLink: '/login'
    },
    {
      label: 'User Dashboard',
      icon: '📊',
      routerLink: '/dashboard'
    }
  ];
}

