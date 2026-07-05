import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TButton, TInputDirective } from 'ui';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TButton, TInputDirective],
  templateUrl: './input-demo.component.html',
  styleUrl: './input-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  readonly nameControl = new FormControl('Taylor', { nonNullable: true });
  readonly searchControl = new FormControl('', { nonNullable: true });
}
