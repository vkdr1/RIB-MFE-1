import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  /** The currently active view id */
  @Input() activeView = 'home';

  /** Emits the view id when a nav item is clicked */
  @Output() navigate = new EventEmitter<string>();

  readonly navItems: NavItem[] = [
    { id: 'home',     label: 'Dashboard', icon: '⊞' },
    { id: 'users',    label: 'Users',     icon: '👥' },
    { id: 'reports',  label: 'Reports',   icon: '📊' },
    { id: 'settings', label: 'Settings',  icon: '⚙' },
  ];

  onNavClick(item: NavItem): void {
    this.navigate.emit(item.id);
  }
}

