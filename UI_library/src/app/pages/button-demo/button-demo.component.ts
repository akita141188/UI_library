import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TButton, TButtonIcon } from 'ui';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [TButton, TButtonIcon],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {
  saving = signal(false);

  save(): void {
    this.saving.set(true);

    setTimeout(() => {
      this.saving.set(false);
    }, 1000);
  }
}
