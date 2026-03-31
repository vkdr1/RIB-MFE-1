import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, CreateUserPayload, USER_ROLES } from '../../../models/user.model';
import { ButtonComponent } from 'shared-ui';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnChanges {
  /** Pass a user to enable Edit mode; null/undefined = Create mode */
  @Input() user: User | null = null;

  /** Emits the form payload on successful save */
  @Output() saved = new EventEmitter<CreateUserPayload>();

  /** Emits when the user cancels */
  @Output() cancelled = new EventEmitter<void>();

  readonly roles = USER_ROLES;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  get isEditMode(): boolean { return !!this.user; }
  get nameCtrl()  { return this.form.get('name')!; }
  get emailCtrl() { return this.form.get('email')!; }
  get phoneCtrl() { return this.form.get('phone')!; }
  get roleCtrl()  { return this.form.get('role')!; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.buildForm();
      if (this.user) {
        this.form.patchValue(this.user);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.value as CreateUserPayload);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  private buildForm(): void {
    this.form = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d\s\-().]{7,20}$/)]],
      role:  ['Developer', Validators.required],
    });
  }
}

