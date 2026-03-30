import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './app.menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppMenuComponent],
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.scss']
})
export class AppSidebarComponent {
  @Input() visible = true;
}

