/**
 * User model representing an authenticated user session.
 * Stored in localStorage on successful login.
 */
export interface User {
  /** User's email address (used as login identifier) */
  email: string;

  /** Display name extracted from email (part before @) */
  name: string;

  /** ISO timestamp of when the user logged in */
  loginTime: string;
}

