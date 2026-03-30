import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbarComponent } from './component/app.topbar.component';
import { AppSidebarComponent } from './component/app.sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AppTopbarComponent, AppSidebarComponent],
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.scss']
})
export class AppLayoutComponent {
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

