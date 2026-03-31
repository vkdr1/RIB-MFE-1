/**
 * User entity for the User Management module.
 * Persisted in browser localStorage under the 'rib_users' key.
 */
export interface User {
  /** Unique identifier (UUID v4-style string) */
  id: string;

  /** Full display name */
  name: string;

  /** Email address */
  email: string;

  /** Contact phone number */
  phone: string;

  /** User role (e.g. Admin, Manager, Viewer) */
  role: string;

  /** ISO timestamp of record creation */
  createdAt: string;

  /** ISO timestamp of last update */
  updatedAt: string;
}

/** Payload for creating a new user (system fields are generated automatically) */
export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/** Payload for updating an existing user */
export type UpdateUserPayload = Partial<CreateUserPayload>;

/** Available role options */
export const USER_ROLES: string[] = ['Admin', 'Manager', 'Developer', 'Viewer'];

