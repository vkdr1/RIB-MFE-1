import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}

