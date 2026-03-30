# Shared UI Library - Implementation Tasks

## Project Overview
Create a shared Angular library that provides reusable UI components built on top of PrimeNG. This library will be used by all remote applications (login, user-dashboard) to ensure consistent UI/UX.

## Business Requirements
- Provide reusable UI components based on PrimeNG
- Ensure consistent styling across all applications
- Export all components through a public API
- Support theming and customization
- Maintain type safety and proper documentation

## Technical Stack
- Angular 21 library
- PrimeNG components
- PrimeIcons
- Standalone components
- TypeScript

---

## Implementation Checklist

### Phase 1: Library Setup
- [ ] Generate shared-ui library: `ng generate library shared-ui`
- [ ] Verify library structure is created
- [ ] Update `tsconfig.json` with path alias for `shared-ui`
- [ ] Configure library build settings in `angular.json`

### Phase 2: Install PrimeNG Dependencies
- [ ] Install PrimeNG: `npm install primeng`
- [ ] Install PrimeIcons: `npm install primeicons`
- [ ] Install PrimeFlex (optional): `npm install primeflex`
- [ ] Add PrimeNG styles to library or consuming apps
- [ ] Verify installations

### Phase 3: Configure PrimeNG Theme
- [ ] Choose PrimeNG theme (e.g., lara-light-blue)
- [ ] Add theme CSS to library styles or global styles
- [ ] Add PrimeIcons CSS
- [ ] Configure custom theme variables (optional)
- [ ] Test theme loads correctly

### Phase 4: Create Button Component
- [ ] Generate component: `ng generate component components/button`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Button (p-button)
- [ ] Add input properties: label, icon, severity, size, disabled, loading
- [ ] Add output events: onClick
- [ ] Create component template
- [ ] Add component styles
- [ ] Export from public API

### Phase 5: Create Input Text Component
- [ ] Generate component: `ng generate component components/input-text`
- [ ] Make component standalone
- [ ] Wrap PrimeNG InputText
- [ ] Add input properties: placeholder, type, disabled, required
- [ ] Implement ControlValueAccessor for form integration
- [ ] Add validation support
- [ ] Create component template
- [ ] Export from public API

### Phase 6: Create Card Component
- [ ] Generate component: `ng generate component components/card`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Card (p-card)
- [ ] Add input properties: header, subheader
- [ ] Add content projection slots (header, body, footer)
- [ ] Create component template
- [ ] Add component styles
- [ ] Export from public API

### Phase 7: Create Table Component
- [ ] Generate component: `ng generate component components/table`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Table (p-table)
- [ ] Add input properties: data, columns, loading, paginator
- [ ] Add template for custom columns
- [ ] Add sorting support
- [ ] Add filtering support (optional)
- [ ] Add pagination support
- [ ] Create component template
- [ ] Export from public API

### Phase 8: Create Dialog/Modal Component
- [ ] Generate component: `ng generate component components/dialog`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Dialog (p-dialog)
- [ ] Add input properties: header, visible, modal, closable
- [ ] Add output events: onHide, onShow
- [ ] Add content projection
- [ ] Create component template
- [ ] Export from public API

### Phase 9: Create Form Field Component
- [ ] Generate component: `ng generate component components/form-field`
- [ ] Make component standalone
- [ ] Create wrapper for form inputs with label and error messages
- [ ] Add input properties: label, error, required, hint
- [ ] Add content projection for input element
- [ ] Create component template
- [ ] Add component styles
- [ ] Export from public API

### Phase 10: Create Toast/Message Component
- [ ] Generate component: `ng generate component components/toast`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Toast (p-toast)
- [ ] Create ToastService for programmatic usage
- [ ] Add methods: showSuccess, showError, showInfo, showWarn
- [ ] Configure toast position and lifecycle
- [ ] Export component and service from public API

### Phase 11: Create Menu Component
- [ ] Generate component: `ng generate component components/menu`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Menu (p-menu or p-panelMenu)
- [ ] Add input properties: items, model
- [ ] Support nested menu items
- [ ] Add active state styling
- [ ] Create component template
- [ ] Export from public API

### Phase 12: Create Dropdown Component
- [ ] Generate component: `ng generate component components/dropdown`
- [ ] Make component standalone
- [ ] Wrap PrimeNG Dropdown (p-dropdown)
- [ ] Add input properties: options, placeholder, disabled
- [ ] Implement ControlValueAccessor
- [ ] Add filtering support (optional)
- [ ] Create component template
- [ ] Export from public API

### Phase 13: Create Loading Spinner Component
- [ ] Generate component: `ng generate component components/spinner`
- [ ] Make component standalone
- [ ] Wrap PrimeNG ProgressSpinner (p-progressSpinner)
- [ ] Add input properties: size, strokeWidth
- [ ] Create component template
- [ ] Add component styles
- [ ] Export from public API

### Phase 14: Create Confirmation Dialog Component
- [ ] Generate component: `ng generate component components/confirm-dialog`
- [ ] Make component standalone
- [ ] Wrap PrimeNG ConfirmDialog (p-confirmDialog)
- [ ] Create ConfirmationService wrapper
- [ ] Add methods: confirm, confirmDelete
- [ ] Configure dialog appearance
- [ ] Export component and service from public API

### Phase 15: Update Public API Exports
- [ ] Open `projects/shared-ui/src/public-api.ts`
- [ ] Export all components
- [ ] Export all services
- [ ] Export any interfaces/types
- [ ] Verify exports are correct
- [ ] Test imports from consuming apps

### Phase 16: Create Component Documentation
- [ ] Document Button component usage
- [ ] Document InputText component usage
- [ ] Document Card component usage
- [ ] Document Table component usage
- [ ] Document Dialog component usage
- [ ] Document FormField component usage
- [ ] Document Toast component usage
- [ ] Create README.md for library (optional)

### Phase 17: Add Styling & Theming
- [ ] Create shared styles file
- [ ] Define CSS custom properties for theming
- [ ] Add RIB brand colors (blue: #0066cc)
- [ ] Create utility classes (spacing, typography)
- [ ] Ensure responsive design
- [ ] Test dark mode support (optional)

### Phase 18: Testing & Verification
- [ ] Build library: `ng build shared-ui`
- [ ] Verify no build errors
- [ ] Test Button component in isolation
- [ ] Test InputText component in isolation
- [ ] Test Card component in isolation
- [ ] Test Table component in isolation
- [ ] Test all components render correctly
- [ ] Verify PrimeNG styles load correctly
- [ ] Test component inputs and outputs
- [ ] Test form integration (ControlValueAccessor)

### Phase 19: Integration Testing
- [ ] Import shared-ui in login project
- [ ] Test Button component in login
- [ ] Test InputText component in login
- [ ] Test Card component in login
- [ ] Import shared-ui in user-dashboard project
- [ ] Test Table component in user-dashboard
- [ ] Test Dialog component in user-dashboard
- [ ] Test Toast component in user-dashboard
- [ ] Verify no import errors
- [ ] Verify styling is consistent

