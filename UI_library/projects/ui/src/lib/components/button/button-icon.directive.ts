import { Directive } from '@angular/core';

@Directive({
  selector: '[tButtonIcon]',
  standalone: true,
  host: {
    class: 't-button__custom-icon',
    'aria-hidden': 'true',
    '[style.display]': '"inline-flex"',
    '[style.width]': '"var(--t-button-icon-size, 1em)"',
    '[style.height]': '"var(--t-button-icon-size, 1em)"',
    '[style.flex]': '"0 0 auto"',
  },
})
export class TButtonIcon {}
