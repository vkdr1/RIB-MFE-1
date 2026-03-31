import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, CreateUserPayload } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ButtonComponent } from 'shared-ui';

type ToastType = 'success' | 'error';
interface Toast { message: string; type: ToastType; }

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent, ButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  // Dialog state
  showForm    = false;
  editingUser: User | null = null;

  // Confirmation state
  confirmDeleteId: string | null = null;

  // Toast notification
  toast: Toast | null = null;
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  openAddDialog(): void {
    this.editingUser = null;
    this.showForm = true;
  }

  openEditDialog(user: User): void {
    this.editingUser = { ...user };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  onFormSaved(payload: CreateUserPayload): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser.id, payload).subscribe({
        next: () => { this.loadUsers(); this.showToast('User updated successfully.', 'success'); },
        error: () => this.showToast('Failed to update user.', 'error'),
      });
    } else {
      this.userService.createUser(payload).subscribe({
        next: () => { this.loadUsers(); this.showToast('User created successfully.', 'success'); },
        error: () => this.showToast('Failed to create user.', 'error'),
      });
    }
    this.closeForm();
  }

  askDelete(id: string): void {
    this.confirmDeleteId = id;
  }

  confirmDelete(): void {
    if (!this.confirmDeleteId) return;
    this.userService.deleteUser(this.confirmDeleteId).subscribe({
      next: () => { this.loadUsers(); this.showToast('User deleted.', 'success'); },
      error: () => this.showToast('Failed to delete user.', 'error'),
    });
    this.confirmDeleteId = null;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => { this.users = users; this.loading = false; },
      error: ()      => { this.loading = false; },
    });
  }

  private showToast(message: string, type: ToastType): void {
    clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => { this.toast = null; }, 3500);
  }
}

