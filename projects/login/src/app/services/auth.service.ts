import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'rib_user';
  private readonly AUTH_KEY = 'rib_auth';

  /**
   * Authenticates a user with email and password.
   *
   * TODO: Replace local validation with an actual API call, e.g.:
   *   return this.http.post<{ token: string; user: User }>('/api/auth/login', { email, password }).pipe(
   *     tap(response => {
   *       localStorage.setItem(this.AUTH_KEY, response.token);
   *       localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response.user));
   *     }),
   *     map(() => true),
   *     catchError(() => of(false))
   *   );
   */
  login(email: string, password: string): Observable<boolean> {
    if (this.isValidEmail(email) && password.length >= 6) {
      const user: User = {
        email,
        name: this.extractUsername(email),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(this.AUTH_KEY, 'true');
      return of(true);
    }
    return of(false);
  }

  /**
   * Clears the user session from localStorage.
   *
   * TODO: Call the API logout endpoint before clearing local state, e.g.:
   *   return this.http.post('/api/auth/logout', {}).pipe(
   *     finalize(() => this.clearSession())
   *   );
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.AUTH_KEY);
  }

  /** Returns true if a valid auth flag is present in localStorage. */
  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  /** Returns the currently stored User object, or null if not authenticated. */
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private extractUsername(email: string): string {
    return email.split('@')[0];
  }
}

