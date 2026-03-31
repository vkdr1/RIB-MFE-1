import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** Emitted when the user clicks the logout button */
  @Output() logout = new EventEmitter<void>();

  username = '';

  ngOnInit(): void {
    this.username = this.resolveUsername();
  }

  onLogout(): void {
    this.logout.emit();
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

