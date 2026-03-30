# User Dashboard Project - Implementation Tasks

## Project Overview
Create a user dashboard remote application that displays a welcome message, header, sidebar navigation, and a user management module with CRUD operations.

## Business Requirements
- Display welcome message with username from email (extracted from login)
- Header with "RIB" text in blue bold font
- Sidebar with multiple navigation options
- User module with working link in sidebar
- User list display
- Full CRUD operations for users (Create, Read, Update, Delete)
- Store user data in browser localStorage
- Use services with commented API integration code
- Use shared-ui components built on PrimeNG

## Technical Stack
- Angular 21 standalone components
- Native Federation (remote module)
- PrimeNG components (via shared-ui)
- Browser localStorage for data persistence
- Reactive Forms for user CRUD
- Services for data management

---

## Implementation Checklist

### Phase 1: Project Setup
- [ ] Generate user-dashboard application: `ng generate application user-dashboard`
- [ ] Configure as Native Federation remote
- [ ] Run `ng add @angular-architects/native-federation` for user-dashboard
- [ ] Set port to 4202 in `angular.json`
- [ ] Verify project structure is created

### Phase 2: Federation Configuration
- [ ] Create `projects/user-dashboard/federation.config.js`
- [ ] Set name to `'user-dashboard'`
- [ ] Expose `'./Component'` pointing to `'./projects/user-dashboard/src/app/app.component.ts'`
- [ ] Configure `shareAll` with singleton and strict version
- [ ] Verify federation config syntax

### Phase 3: Create Dashboard Layout Structure
- [ ] Create header component: `ng generate component components/header`
- [ ] Create sidebar component: `ng generate component components/sidebar`
- [ ] Create main layout component structure in app.component
- [ ] Import required shared-ui components
- [ ] Set up routing module for dashboard

### Phase 4: Implement Header Component
- [ ] Create header template with "RIB" branding
- [ ] Style "RIB" text with blue color and bold font
- [ ] Add user welcome message area
- [ ] Display username from localStorage
- [ ] Add logout button (optional)
- [ ] Make header responsive
- [ ] Use shared-ui components for styling consistency

### Phase 5: Implement Sidebar Component
- [ ] Create sidebar navigation structure
- [ ] Add navigation menu items (Dashboard, Users, Settings, Reports, etc.)
- [ ] Make "Users" link functional (route to `/dashboard/users`)
- [ ] Add active state styling for current route
- [ ] Use PrimeNG Menu component via shared-ui
- [ ] Add icons to menu items (optional)
- [ ] Make sidebar collapsible (optional)
- [ ] Style sidebar with proper spacing and colors

### Phase 6: Create User Model & Interface
- [ ] Create `models/user.model.ts`
- [ ] Define User interface with fields:
  - `id: string`
  - `name: string`
  - `email: string`
  - `phone: string`
  - `role: string`
  - `createdAt: Date`
  - `updatedAt: Date`
- [ ] Export User interface

### Phase 7: Create User Service
- [ ] Generate user service: `ng generate service services/user`
- [ ] Create `getUsers(): Observable<User[]>` method
- [ ] Create `getUserById(id: string): Observable<User>` method
- [ ] Create `createUser(user: User): Observable<User>` method
- [ ] Create `updateUser(id: string, user: User): Observable<User>` method
- [ ] Create `deleteUser(id: string): Observable<boolean>` method
- [ ] Implement localStorage CRUD operations
- [ ] Add commented code for future API integration
- [ ] Add error handling

### Phase 8: Implement User Service - localStorage Logic
- [ ] Create private method to get users from localStorage
- [ ] Create private method to save users to localStorage
- [ ] Implement getUsers() - read from localStorage
- [ ] Implement getUserById() - find user by ID
- [ ] Implement createUser() - add new user with generated ID
- [ ] Implement updateUser() - update existing user
- [ ] Implement deleteUser() - remove user from storage
- [ ] Add seed data for initial testing (optional)

### Phase 9: Create User List Component
- [ ] Generate component: `ng generate component features/users/user-list`
- [ ] Import UserService
- [ ] Create users$ observable or users array
- [ ] Load users on component init
- [ ] Display users in PrimeNG Table (via shared-ui)
- [ ] Add columns: Name, Email, Phone, Role, Actions
- [ ] Add action buttons: Edit, Delete
- [ ] Add "Add New User" button
- [ ] Handle loading state
- [ ] Handle empty state

### Phase 10: Create User Form Component
- [ ] Generate component: `ng generate component features/users/user-form`
- [ ] Import ReactiveFormsModule
- [ ] Create FormGroup with user fields
- [ ] Add validators (required, email, phone pattern)
- [ ] Create form template with shared-ui inputs
- [ ] Add Save and Cancel buttons
- [ ] Implement form submission
- [ ] Handle create vs update mode
- [ ] Add form validation messages
- [ ] Reset form after successful save

### Phase 11: Implement User CRUD Operations
- [ ] Implement Add User functionality
  - [ ] Show user form dialog/modal
  - [ ] Call createUser() service method
  - [ ] Refresh user list after creation
  - [ ] Show success message
- [ ] Implement Edit User functionality
  - [ ] Populate form with selected user data
  - [ ] Call updateUser() service method
  - [ ] Refresh user list after update
  - [ ] Show success message
- [ ] Implement Delete User functionality
  - [ ] Show confirmation dialog
  - [ ] Call deleteUser() service method
  - [ ] Refresh user list after deletion
  - [ ] Show success message

### Phase 12: Create User Routing
- [ ] Create `app.routes.ts` in user-dashboard
- [ ] Add route for user list: `/users`
- [ ] Add route for user form: `/users/new` and `/users/:id/edit` (optional)
- [ ] Configure default route to show welcome dashboard
- [ ] Add route guards if needed (optional)

### Phase 13: Implement Welcome Dashboard View
- [ ] Create dashboard home component (optional separate component)
- [ ] Display welcome message: "Welcome, [username]!"
- [ ] Extract username from localStorage
- [ ] Add dashboard cards/widgets (optional)
- [ ] Add quick stats (total users, etc.)
- [ ] Use shared-ui Card components
- [ ] Make it visually appealing

### Phase 14: Import Shared UI Components
- [ ] Import Table component from shared-ui
- [ ] Import Button component from shared-ui
- [ ] Import Card component from shared-ui
- [ ] Import Input components from shared-ui
- [ ] Import Dialog/Modal component from shared-ui
- [ ] Import Message/Toast component from shared-ui
- [ ] Verify all components render correctly

### Phase 15: Styling & Layout
- [ ] Style header with blue RIB branding
- [ ] Style sidebar with proper navigation
- [ ] Create responsive grid layout
- [ ] Add proper spacing and padding
- [ ] Style user table with alternating rows
- [ ] Add hover effects to table rows
- [ ] Make layout responsive for mobile
- [ ] Test on different screen sizes

### Phase 16: Add Notifications & Feedback
- [ ] Add success toast on user creation
- [ ] Add success toast on user update
- [ ] Add success toast on user deletion
- [ ] Add error toast on operation failure
- [ ] Use PrimeNG Toast component via shared-ui
- [ ] Add loading spinners during operations

### Phase 17: Testing & Verification
- [ ] Test user list displays correctly
- [ ] Test add new user functionality
- [ ] Test edit user functionality
- [ ] Test delete user functionality
- [ ] Verify data persists in localStorage
- [ ] Test form validation
- [ ] Test navigation between views
- [ ] Test welcome message displays username
- [ ] Test header displays "RIB" correctly
- [ ] Test sidebar navigation works
- [ ] Verify no console errors

### Phase 18: Integration with Shell
- [ ] Verify user-dashboard remote is exposed correctly
- [ ] Test loading from shell via `/dashboard` route
- [ ] Verify shared-ui components render correctly
- [ ] Test navigation from login to dashboard
- [ ] Test user module navigation
- [ ] Verify no console errors

---

## Code Structure

### File Organization
```
projects/user-dashboard/
├── src/
│   ├── app/
│   │   ├── app.component.ts              # Main dashboard layout
│   │   ├── app.component.html            # Layout template
│   │   ├── app.component.scss            # Layout styles
│   │   ├── app.routes.ts                 # Dashboard routing
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   └── sidebar/
│   │   │       ├── sidebar.component.ts
│   │   │       ├── sidebar.component.html
│   │   │       └── sidebar.component.scss
│   │   ├── features/
│   │   │   └── users/
│   │   │       ├── user-list/
│   │   │       │   ├── user-list.component.ts
│   │   │       │   ├── user-list.component.html
│   │   │       │   └── user-list.component.scss
│   │   │       └── user-form/
│   │   │           ├── user-form.component.ts
│   │   │           ├── user-form.component.html
│   │   │           └── user-form.component.scss
│   │   ├── services/
│   │   │   └── user.service.ts           # User CRUD service
│   │   └── models/
│   │       └── user.model.ts             # User interface
│   ├── main.ts
│   └── bootstrap.ts
├── federation.config.js
└── tsconfig.app.json
```

---

## Sample Code Templates

### User Model
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Service Structure
```typescript
export class UserService {
  private readonly STORAGE_KEY = 'rib_users';

  getUsers(): Observable<User[]> {
    // TODO: Replace with actual API call
    // return this.http.get<User[]>('/api/users');

    const users = this.getUsersFromStorage();
    return of(users);
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<User> {
    // TODO: Replace with actual API call
    // return this.http.post<User>('/api/users', user);

    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const users = this.getUsersFromStorage();
    users.push(newUser);
    this.saveUsersToStorage(users);

    return of(newUser);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    // TODO: Replace with actual API call
    // return this.http.put<User>(`/api/users/${id}`, user);

    const users = this.getUsersFromStorage();
    const index = users.findIndex(u => u.id === id);

    if (index !== -1) {
      users[index] = { ...users[index], ...user, updatedAt: new Date() };
      this.saveUsersToStorage(users);
      return of(users[index]);
    }

    return throwError(() => new Error('User not found'));
  }

  deleteUser(id: string): Observable<boolean> {
    // TODO: Replace with actual API call
    // return this.http.delete<void>(`/api/users/${id}`).pipe(map(() => true));

    const users = this.getUsersFromStorage();
    const filteredUsers = users.filter(u => u.id !== id);
    this.saveUsersToStorage(filteredUsers);

    return of(true);
  }

  private getUsersFromStorage(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
```

### Header Component Template
```html
<header class="dashboard-header">
  <div class="header-left">
    <h1 class="rib-brand">RIB</h1>
  </div>
  <div class="header-right">
    <span class="welcome-message">Welcome, {{ username }}!</span>
  </div>
</header>
```

### Header Component Styles
```scss
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.rib-brand {
  font-size: 2rem;
  font-weight: bold;
  color: #0066cc; // RIB Blue
  margin: 0;
}

.welcome-message {
  font-size: 1rem;
  color: #333;
}
```

### Sidebar Menu Items
```typescript
export const MENU_ITEMS = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
  { label: 'Users', icon: 'pi pi-users', route: '/dashboard/users' },
  { label: 'Settings', icon: 'pi pi-cog', route: '/dashboard/settings' },
  { label: 'Reports', icon: 'pi pi-chart-bar', route: '/dashboard/reports' },
  { label: 'Profile', icon: 'pi pi-user', route: '/dashboard/profile' }
];
```

---

## Dependencies Required
- `@angular/forms` (ReactiveFormsModule)
- `@angular/router` (Router, RouterModule)
- `shared-ui` library (for PrimeNG components)
- `rxjs` (Observable, of, throwError)

---

## Acceptance Criteria
✅ Dashboard displays header with "RIB" in blue bold font
✅ Dashboard displays welcome message with username from login
✅ Sidebar displays multiple navigation options
✅ Users link in sidebar navigates to user list
✅ User list displays all users from localStorage
✅ Add user functionality works and persists to localStorage
✅ Edit user functionality works and updates localStorage
✅ Delete user functionality works and removes from localStorage
✅ All CRUD operations use UserService
✅ Service includes commented code for future API integration
✅ All UI components are from shared-ui library (PrimeNG-based)
✅ Form validation works correctly
✅ Success/error messages display for all operations
✅ Layout is responsive and accessible

