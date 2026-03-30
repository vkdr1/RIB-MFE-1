import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onMenuToggle() {
    this.menuToggle.emit();
  }
}

