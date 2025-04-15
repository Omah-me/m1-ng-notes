import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() id: number = 0;
  @Input() name: string = 'Default tag';
  @Input() color: string = '#00FFFF';
}
