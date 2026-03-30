# Login Project - Implementation Tasks

## Project Overview
Create a login remote application that handles user authentication with email and password validation.

## Business Requirements
- Username must be a valid email address
- Password must be at least 6 characters
- On successful login, navigate to `/dashboard`
- Store user session in browser storage
- Use shared-ui components from the shared-ui library

## Technical Stack
- Angular 21 standalone components
- Native Federation (remote module)
- PrimeNG components (via shared-ui)
- Browser localStorage for session management
- Reactive Forms

---

## Implementation Checklist

### Phase 1: Project Setup
- [ ] Generate login application: `ng generate application login`
- [ ] Configure as Native Federation remote
- [ ] Run `ng add @angular-architects/native-federation` for login
- [ ] Set port to 4201 in `angular.json`
- [ ] Verify project structure is created

### Phase 2: Federation Configuration
- [ ] Create `projects/login/federation.config.js`
- [ ] Set name to `'login'`
- [ ] Expose `'./Component'` pointing to `'./projects/login/src/app/app.component.ts'`
- [ ] Configure `shareAll` with singleton and strict version
- [ ] Verify federation config syntax

### Phase 3: Create Login Component Structure
- [ ] Update `app.component.ts` to be standalone
- [ ] Import `ReactiveFormsModule` in component
- [ ] Import required PrimeNG modules via shared-ui
- [ ] Create component template structure
- [ ] Create component styles

### Phase 4: Import Shared UI Components
- [ ] Import `ButtonComponent` from shared-ui
- [ ] Import `InputTextComponent` from shared-ui (PrimeNG wrapper)
- [ ] Import `CardComponent` from shared-ui
- [ ] Import `FormFieldComponent` from shared-ui (if available)
- [ ] Verify all imports resolve correctly

### Phase 5: Create Login Form
- [ ] Create FormGroup with email and password controls
- [ ] Add email validator (Validators.required, Validators.email)
- [ ] Add password validator (Validators.required, Validators.minLength(6))
- [ ] Bind form controls to template
- [ ] Add form submission handler

### Phase 6: Implement Form Template
- [ ] Create login card container using shared-ui Card component
- [ ] Add form header "Login to RIB"
- [ ] Add email input field with label
- [ ] Add password input field with label and type="password"
- [ ] Add validation error messages for email
- [ ] Add validation error messages for password
- [ ] Add submit button using shared-ui Button component
- [ ] Disable submit button when form is invalid
- [ ] Add loading state to button during submission

### Phase 7: Create Authentication Service
- [ ] Generate auth service: `ng generate service services/auth`
- [ ] Create `login(email: string, password: string)` method
- [ ] Implement email validation logic
- [ ] Implement password length validation (min 6 chars)
- [ ] Store user session in localStorage on success
- [ ] Create `logout()` method
- [ ] Create `isAuthenticated()` method
- [ ] Create `getCurrentUser()` method
- [ ] Add commented code for future API integration

### Phase 8: Implement Login Logic
- [ ] Inject AuthService in login component
- [ ] Inject Router for navigation
- [ ] Call AuthService.login() on form submit
- [ ] Handle successful login (store user data)
- [ ] Navigate to `/dashboard` on success
- [ ] Display error message on validation failure
- [ ] Add loading state during login process
- [ ] Clear form on successful login

### Phase 9: Session Storage Implementation
- [ ] Create interface for User model (email, name, loginTime)
- [ ] Store user object in localStorage as JSON
- [ ] Store authentication token/flag in localStorage
- [ ] Extract username from email (part before @)
- [ ] Add session expiry logic (optional)

### Phase 10: Styling & UX
- [ ] Center login form on page
- [ ] Add RIB branding/logo (optional)
- [ ] Style form with proper spacing
- [ ] Add focus states to inputs
- [ ] Add hover states to button
- [ ] Make form responsive for mobile
- [ ] Add smooth transitions
- [ ] Test accessibility (keyboard navigation, screen readers)

### Phase 11: Error Handling
- [ ] Show inline validation errors
- [ ] Show error message for invalid credentials
- [ ] Handle empty form submission
- [ ] Add proper error styling (red text, icons)
- [ ] Clear errors on input change

### Phase 12: Testing & Verification
- [ ] Test with valid email and 6+ char password
- [ ] Test with invalid email format
- [ ] Test with password less than 6 characters
- [ ] Test with empty fields
- [ ] Verify navigation to dashboard works
- [ ] Verify user data is stored in localStorage
- [ ] Test form validation messages display correctly
- [ ] Test button disabled state
- [ ] Test loading state during submission

### Phase 13: Integration with Shell
- [ ] Verify login remote is exposed correctly
- [ ] Test loading from shell via `/login` route
- [ ] Verify shared-ui components render correctly
- [ ] Test navigation from login to dashboard
- [ ] Verify no console errors

---

## Code Structure

### File Organization
```
projects/login/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Main login component
│   │   ├── app.component.html        # Login form template
│   │   ├── app.component.scss        # Login styles
│   │   ├── services/
│   │   │   └── auth.service.ts       # Authentication service
│   │   └── models/
│   │       └── user.model.ts         # User interface
│   ├── main.ts
│   └── bootstrap.ts
├── federation.config.js
└── tsconfig.app.json
```

---

## Sample Code Templates

### AuthService Structure
```typescript
export class AuthService {
  private readonly STORAGE_KEY = 'rib_user';
  private readonly AUTH_KEY = 'rib_auth';

  login(email: string, password: string): Observable<boolean> {
    // TODO: Replace with actual API call
    // return this.http.post('/api/auth/login', { email, password });

    // Current implementation: validate locally
    if (this.isValidEmail(email) && password.length >= 6) {
      const user = {
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

  // Additional methods...
}
```

### Login Component Structure
```typescript
export class AppComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Login failed';
          this.loading = false;
        }
      });
    }
  }
}
```

---

## Dependencies Required
- `@angular/forms` (ReactiveFormsModule)
- `@angular/router` (Router)
- `shared-ui` library (for PrimeNG components)
- `rxjs` (Observable, of)

---

## Acceptance Criteria
✅ Login form displays with email and password fields
✅ Email validation works (must be valid email format)
✅ Password validation works (minimum 6 characters)
✅ Submit button is disabled when form is invalid
✅ Successful login stores user data in localStorage
✅ Successful login navigates to `/dashboard`
✅ Error messages display for invalid inputs
✅ All UI components are from shared-ui library
✅ Code includes comments for future API integration
✅ Form is responsive and accessible

