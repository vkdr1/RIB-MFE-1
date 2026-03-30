# New Angular Native Federation Project Blueprint

## Goal

Create a **new Angular 21 Native Federation workspace** that follows the same architecture and conventions as this repository, but uses the following business projects:

- `shell` -> host application
- `login` -> remote application
- `user-dashboard` -> remote application
- `shared-ui` -> shared Angular library

> Important: even though you want `login`, `user-dashboard`, and `shared-ui`, you should still keep a **host app** (`shell`) because the current architecture depends on a host to compose the remotes.

## Target Architecture

The new workspace should keep the same design pattern as the current repo:

1. **Shell** = host app, owns layout, topbar, sidebar, routing, and federation manifest
2. **Login** = remote MFE, exposed as a standalone component
3. **User Dashboard** = remote MFE, exposed as a standalone component
4. **Shared UI** = reusable Angular library used by multiple apps
5. **Docker + Nginx** = same multi-container local/dev/prod setup

## Recommended Project Mapping

Use this mapping from the current repo to the new one:

| Current project | New project |
| --- | --- |
| `shell` | `shell` |
| `mfe-dashboard` | `user-dashboard` |
| `mfe-settings` | `login` |
| `mfe-uikit` | remove |
| `shared-ui` | `shared-ui` |

## Recommended Ports

- `shell`: `4200`
- `login`: `4201`
- `user-dashboard`: `4202`
- `gateway`: `80`

## Suggested Route Design

- `/` -> redirect to `/login` or `/dashboard` depending on your preferred UX
- `/login` -> loads remote `login`
- `/dashboard` -> loads remote `user-dashboard`

If authentication is needed later, the shell can decide whether to route users to `login` or `dashboard`.

## Step-by-Step Implementation Guide

### 1. Create the new workspace

Create a new Angular workspace with the same core stack used here:

- Angular 21
- `@angular-architects/native-federation`
- standalone components
- PrimeNG / Tailwind if you want the same UI foundation
- Docker + Nginx setup

### 2. Create the projects

Inside `projects/`, create:

- `projects/shell`
- `projects/login`
- `projects/user-dashboard`
- `projects/shared-ui`

The structure should conceptually look like this:

- `projects/shell/` = host
- `projects/login/` = remote component MFE
- `projects/user-dashboard/` = remote component MFE
- `projects/shared-ui/` = Angular library

### 3. Configure Angular workspace entries

In `angular.json`:

1. Keep `shell` as an application using `@angular-architects/native-federation:build`
2. Add `login` as an application with the same builder pattern
3. Add `user-dashboard` as an application with the same builder pattern
4. Keep `shared-ui` as a library built with `@angular/build:ng-packagr`
5. Assign ports:
   - shell `4200`
   - login `4201`
   - user-dashboard `4202`

### 4. Configure federation files

Create one `federation.config.js` per app.

#### `projects/shell/federation.config.js`
- name should be `shell`
- use `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`
- keep the same `skip` and `features.ignoreUnusedDeps` pattern as the current repo

#### `projects/login/federation.config.js`
- name should be `login`
- expose `./Component`
- exposed file should point to `./projects/login/src/app/app.ts`

#### `projects/user-dashboard/federation.config.js`
- name should be `user-dashboard`
- expose `./Component`
- exposed file should point to `./projects/user-dashboard/src/app/app.ts`

### 5. Configure shell manifest

Update `projects/shell/public/assets/federation.manifest.json` to something like:

- `login` -> `http://localhost:4201/remoteEntry.json`
- `user-dashboard` -> `http://localhost:4202/remoteEntry.json`

### 6. Configure shell bootstrap

Keep the same shell startup pattern:

- `projects/shell/src/main.ts` should call `initFederation('/assets/federation.manifest.json')`
- then import `./bootstrap`

This is already the correct host pattern in the current repository.

### 7. Configure shell routes

In `projects/shell/src/app/app.routes.ts`, replace the current dashboard/settings/uikit loading with only the routes you need.

Recommended route structure:

1. `/login` -> `loadRemoteModule('login', './Component')`
2. `/dashboard` -> `loadRemoteModule('user-dashboard', './Component')`
3. optional root redirect:
   - `{ path: '', redirectTo: '/login', pathMatch: 'full' }`
4. keep `notfound` route
5. keep wildcard redirect to `/notfound`

If you want the login page without the full shell layout, you can place the `/login` route outside the main `AppLayout` route tree.

### 8. Update shell navigation

In `projects/shell/src/app/layout/component/app.menu.ts`:

1. remove UIKit menu entries
2. remove old dashboard/settings items
3. add a simple menu like:
   - `Login` -> `/login`
   - `User Dashboard` -> `/dashboard`

### 9. Build the login remote

`login` should be a **simple remote component**.

Suggested responsibility:

- render a login form
- optionally use reusable buttons/inputs from `shared-ui`
- optionally navigate to `/dashboard` after a mock login

Implementation style should follow the current `mfe-settings` pattern: a remote exposing one standalone component.

### 10. Build the user-dashboard remote

`user-dashboard` should also be a **simple remote component**.

Suggested responsibility:

- show dashboard cards/widgets
- show user summary, quick actions, or analytics
- optionally import reusable components from `shared-ui`

Implementation style should follow the current `mfe-dashboard` pattern: a remote exposing one standalone component.

### 11. Keep `shared-ui` as a library

In `projects/shared-ui`:

1. keep the Angular library structure
2. export reusable standalone UI components from `src/public-api.ts`
3. keep the root `tsconfig.json` path alias:
   - `shared-ui` -> `./projects/shared-ui/src/public-api.ts`

Good candidates for shared components:

- button component
- page header component
- form input wrapper
- card component
- loading spinner

### 12. Update TypeScript references

In root `tsconfig.json`:

1. keep path alias for `shared-ui`
2. update `references` so they include:
   - `./projects/shell/tsconfig.app.json`
   - `./projects/login/tsconfig.app.json`
   - `./projects/user-dashboard/tsconfig.app.json`
   - shared-ui library/spec references

### 13. Update Docker development setup

In `docker-compose.dev.yml`:

1. keep `shell`
2. replace `mfe-dashboard` with `user-dashboard`
3. replace `mfe-settings` with `login`
4. remove `mfe-uikit`
5. keep `gateway`
6. keep syncing `projects/shared-ui`

Development services should expose:

- shell -> `4200:4200`
- login -> `4201:4201`
- user-dashboard -> `4202:4202`

### 14. Update Docker production setup

In `docker-compose.yml`:

1. keep `shell`
2. add `login`
3. add `user-dashboard`
4. remove `mfe-uikit`
5. keep `gateway`

The existing `Dockerfile` pattern can remain the same because it already builds `shared-ui` first and then builds a selected app using `PROJECT_NAME`.

### 15. Update Nginx gateway routing

In `nginx/gateway.conf`:

1. add upstream for `login`
2. add upstream for `user-dashboard`
3. remove old upstreams for settings/uikit/dashboard if not needed
4. add locations:
   - `/login/` -> login container
   - `/user-dashboard/` -> user-dashboard container (optional direct access)
5. keep `/` -> shell container

### 16. Clean up old project references

Remove all references to:

- `mfe-dashboard`
- `mfe-settings`
- `mfe-uikit`
- `/uikit/...`
- old README examples tied to dashboard/settings/uikit

### 17. Verify locally

Recommended verification sequence:

1. build shared library
2. build `login`
3. build `user-dashboard`
4. build `shell`
5. start Docker dev environment
6. verify shell loads remotes correctly

Check these flows manually:

1. open `http://localhost`
2. verify shell renders
3. verify `/login` loads the login remote
4. verify `/dashboard` loads the user-dashboard remote
5. verify shared-ui components render in both remotes

## Important Notes

- This repo uses **component-based remotes** for simple features. That is the best fit for `login` and `user-dashboard`.
- You do **not** need a route-based remote like `mfe-uikit` unless one remote owns many nested subpages.
- Keep imports conservative. In this repo, Native Federation + esbuild can be sensitive to some path alias usage inside remotes.
- Keep `shared-ui` as the only cross-app reusable library.

## Copy-Paste Prompt for AI / Code Generator

Create a new Angular 21 workspace using Native Federation, based on the same architecture and folder conventions as my current micro-frontend repository. The new workspace must contain four projects: `shell` (host app), `login` (remote app), `user-dashboard` (remote app), and `shared-ui` (Angular library). Do not create `mfe-uikit` or `mfe-settings`.

Requirements:

1. Use standalone Angular applications.
2. Use `@angular-architects/native-federation` with the same shared dependency strategy: `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`.
3. `shell` must load remotes through `projects/shell/public/assets/federation.manifest.json`.
4. `login` must expose `./Component` from `projects/login/src/app/app.ts`.
5. `user-dashboard` must expose `./Component` from `projects/user-dashboard/src/app/app.ts`.
6. Configure shell routes so `/login` loads the login remote and `/dashboard` loads the user-dashboard remote.
7. Keep `shared-ui` as an Angular library with a root path alias `shared-ui`.
8. Match the current repo's Docker and Nginx structure:
   - shell on 4200
   - login on 4201
   - user-dashboard on 4202
   - gateway on 80
9. Update `docker-compose.yml`, `docker-compose.dev.yml`, `nginx/gateway.conf`, `angular.json`, `tsconfig.json`, and the shell manifest accordingly.
10. Keep the overall folder structure and coding style close to the existing repository.

Deliverables:

- full workspace structure
- federation configs
- shell routing
- Docker setup
- Nginx gateway setup
- shared-ui exports
- minimal working login page
- minimal working user dashboard page

---

## Strict Implementation Checklist

Use this checklist to track your progress when building the new project:

### Phase 1: Project Setup
- [ ] Create new Angular workspace
- [ ] Install Angular CLI (if not already installed)
- [ ] Verify Node.js version compatibility (v18+ recommended)
- [ ] Initialize Git repository (optional)

### Phase 2: Generate Projects
- [ ] Generate `shell` application (host)
- [ ] Generate `login` application (remote)
- [ ] Generate `user-dashboard` application (remote)
- [ ] Generate `shared-ui` library

### Phase 3: Install Dependencies
- [ ] Install `@angular-architects/native-federation` package
- [ ] Install `@angular-architects/native-federation-runtime` package
- [ ] Install PrimeNG (optional, if using same UI framework)
- [ ] Install Tailwind CSS (optional, if using same styling)
- [ ] Verify package.json has all required dependencies
- [ ] Run `npm install` to install all packages

### Phase 4: Configure Native Federation
- [ ] Run federation init for `shell` project
- [ ] Run federation init for `login` project
- [ ] Run federation init for `user-dashboard` project
- [ ] Configure `federation.config.js` for shell (host)
- [ ] Configure `federation.config.js` for login (remote)
- [ ] Configure `federation.config.js` for user-dashboard (remote)
- [ ] Update shell's `federation.manifest.json` with remote entries

### Phase 5: Update angular.json
- [ ] Update shell build configuration
- [ ] Update shell serve configuration
- [ ] Update login build configuration
- [ ] Update login serve configuration
- [ ] Update user-dashboard build configuration
- [ ] Update user-dashboard serve configuration
- [ ] Verify all port numbers are correct (shell: 4200, login: 4201, user-dashboard: 4202)

### Phase 6: Configure Routing
- [ ] Create routes in shell for `/login` and `/dashboard`
- [ ] Implement lazy loading with `loadRemoteModule` in shell
- [ ] Create routing module in login remote
- [ ] Create routing module in user-dashboard remote
- [ ] Add navigation/menu in shell (optional)
- [ ] Configure root redirect (optional)

### Phase 7: Shared UI Library
- [ ] Create components in shared-ui library
- [ ] Export components from shared-ui public API (`src/public-api.ts`)
- [ ] Add path alias in root `tsconfig.json` for `shared-ui`
- [ ] Import shared-ui in login project
- [ ] Import shared-ui in user-dashboard project
- [ ] Import shared-ui in shell project
- [ ] Verify shared-ui components render correctly

### Phase 8: Create Components & Features
- [ ] Create login form component in login remote
- [ ] Create user dashboard component in user-dashboard remote
- [ ] Implement basic authentication logic (optional)
- [ ] Add shared UI components to remotes
- [ ] Style components (optional)

### Phase 9: Docker Configuration
- [ ] Create Dockerfile for shell
- [ ] Create Dockerfile for login
- [ ] Create Dockerfile for user-dashboard
- [ ] Create Nginx configuration for shell
- [ ] Create Nginx configuration for login
- [ ] Create Nginx configuration for user-dashboard
- [ ] Create `docker-compose.yml` for production
- [ ] Create `docker-compose.dev.yml` for development
- [ ] Create Nginx gateway configuration (`nginx/gateway.conf`)
- [ ] Create gateway Dockerfile

### Phase 10: Build Verification (Optional)
- [ ] **Build shared-ui**: `ng build shared-ui`
- [ ] **Build shell**: `ng build shell`
- [ ] **Build login**: `ng build login`
- [ ] **Build user-dashboard**: `ng build user-dashboard`
- [ ] **Build all projects**: `npm run build` (if script exists)
- [ ] Verify no build errors
- [ ] Check dist folder for all projects
- [ ] Verify `remoteEntry.json` files are generated for remotes

### Phase 11: Development Testing (Optional)
- [ ] Start all remotes first (login and user-dashboard)
- [ ] Start login in dev mode: `ng serve login`
- [ ] Start user-dashboard in dev mode: `ng serve user-dashboard`
- [ ] Start shell in dev mode: `ng serve shell`
- [ ] Navigate to `http://localhost:4200` (shell)
- [ ] Test navigation to `/login` route
- [ ] Test navigation to `/dashboard` route
- [ ] Verify shared-ui components display correctly
- [ ] Test hot module replacement (HMR)
- [ ] Check browser console for errors
- [ ] Verify federation manifest loads correctly

### Phase 12: Docker Testing (Optional)
- [ ] Build Docker images: `docker-compose build`
- [ ] Start containers: `docker-compose up`
- [ ] Access shell via gateway: `http://localhost:80` or `http://localhost`
- [ ] Test `/login` route through gateway
- [ ] Test `/dashboard` route through gateway
- [ ] Verify Nginx routing works correctly
- [ ] Check Docker logs for errors: `docker-compose logs`
- [ ] Stop containers: `docker-compose down`
- [ ] Test development Docker setup: `docker-compose -f docker-compose.dev.yml up`

### Phase 13: Final Verification
- [ ] All remotes load without errors
- [ ] Routing between remotes works
- [ ] Shared UI library is accessible from all projects
- [ ] No console errors in browser
- [ ] No 404 errors for remote modules
- [ ] Docker setup works (if implemented)
- [ ] Documentation is complete (optional)

### Phase 14: Cleanup & Optimization (Optional)
- [ ] Remove unused dependencies
- [ ] Optimize bundle sizes
- [ ] Add environment configurations (dev, staging, prod)
- [ ] Set up CI/CD pipeline (optional)
- [ ] Add unit tests (optional)
- [ ] Add e2e tests (optional)
- [ ] Add linting and formatting rules (optional)
- [ ] Update README with project-specific instructions
