import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards: DashboardCard[] = [
    { title: 'Total Users',      value: '1,234',  icon: '👥', color: '#1976d2' },
    { title: 'Active Sessions',  value: '567',    icon: '🔄', color: '#388e3c' },
    { title: 'Revenue',          value: '$12,345', icon: '💰', color: '#f57c00' },
    { title: 'Tasks',            value: '89',     icon: '✓',  color: '#7b1fa2' }
  ];
}

