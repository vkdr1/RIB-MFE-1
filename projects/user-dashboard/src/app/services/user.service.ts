import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User, CreateUserPayload, UpdateUserPayload } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly STORAGE_KEY = 'rib_users';

  constructor() {
    this.seedIfEmpty();
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /**
   * Returns all users.
   *
   * TODO: Replace with API call:
   *   return this.http.get<User[]>('/api/users');
   */
  getUsers(): Observable<User[]> {
    return of(this.readFromStorage());
  }

  /**
   * Returns a single user by ID.
   *
   * TODO: Replace with API call:
   *   return this.http.get<User>(`/api/users/${id}`);
   */
  getUserById(id: string): Observable<User> {
    const user = this.readFromStorage().find(u => u.id === id);
    return user ? of(user) : throwError(() => new Error(`User ${id} not found`));
  }

  /**
   * Creates a new user and persists it.
   *
   * TODO: Replace with API call:
   *   return this.http.post<User>('/api/users', payload);
   */
  createUser(payload: CreateUserPayload): Observable<User> {
    const users = this.readFromStorage();
    const now = new Date().toISOString();
    const newUser: User = {
      ...payload,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    };
    users.push(newUser);
    this.writeToStorage(users);
    return of(newUser);
  }

  /**
   * Updates an existing user by ID.
   *
   * TODO: Replace with API call:
   *   return this.http.put<User>(`/api/users/${id}`, payload);
   */
  updateUser(id: string, payload: UpdateUserPayload): Observable<User> {
    const users = this.readFromStorage();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return throwError(() => new Error(`User ${id} not found`));

    const updated: User = {
      ...users[index],
      ...payload,
      id,
      updatedAt: new Date().toISOString(),
    };
    users[index] = updated;
    this.writeToStorage(users);
    return of(updated);
  }

  /**
   * Deletes a user by ID.
   *
   * TODO: Replace with API call:
   *   return this.http.delete<void>(`/api/users/${id}`).pipe(map(() => true));
   */
  deleteUser(id: string): Observable<boolean> {
    const users = this.readFromStorage().filter(u => u.id !== id);
    this.writeToStorage(users);
    return of(true);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private readFromStorage(): User[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as User[];
    } catch {
      return [];
    }
  }

  private writeToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }

  /** Seed a few demo users on first load so the list is not empty. */
  private seedIfEmpty(): void {
    if (this.readFromStorage().length > 0) return;
    const now = new Date().toISOString();
    const seed: User[] = [
      { id: 'seed-1', name: 'Alice Johnson', email: 'alice@rib.com', phone: '+1-555-0101', role: 'Admin', createdAt: now, updatedAt: now },
      { id: 'seed-2', name: 'Bob Smith', email: 'bob@rib.com', phone: '+1-555-0102', role: 'Developer', createdAt: now, updatedAt: now },
      { id: 'seed-3', name: 'Carol White', email: 'carol@rib.com', phone: '+1-555-0103', role: 'Manager', createdAt: now, updatedAt: now },
    ];
    this.writeToStorage(seed);
  }
}

