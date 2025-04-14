import { Component ,input} from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  id = input<number>(0);
  name = input<string>('Default tag');
  color = input<string>('#888888');
}
