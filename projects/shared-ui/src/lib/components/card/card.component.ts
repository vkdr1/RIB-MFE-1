import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() elevation: 'low' | 'medium' | 'high' = 'medium';
}

