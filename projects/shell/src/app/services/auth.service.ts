import { Injectable, signal, computed } from '@angular/core';

/**
 * Shell-level AuthService.
 *
 * Reads the same localStorage keys written by the login MFE so the shell
 * can react to authentication state without a direct code dependency on
 * the remote bundle.
 *
 * Keys (must stay in sync with login MFE's AuthService):
 *   rib_auth  – 'true' when a session exists
 *   rib_user  – JSON-serialised User object
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_KEY = 'rib_auth';

  /** Internal writable signal – only mutated via checkAuth() */
  private readonly _authenticated = signal<boolean>(this.readStorage());

  /** Public read-only computed signal consumed by components/guards */
  readonly isAuthenticated = computed(() => this._authenticated());

  /**
   * Re-reads localStorage and updates the signal.
   * Call this on every NavigationEnd so components stay in sync
   * after the login MFE writes to localStorage and navigates away.
   */
  checkAuth(): boolean {
    const result = this.readStorage();
    this._authenticated.set(result);
    return result;
  }

  private readStorage(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}

