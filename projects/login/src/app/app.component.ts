import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // Mock login - in real app, validate credentials
    if (this.username && this.password) {
      console.log('Login successful');
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please enter username and password');
    }
  }
}

