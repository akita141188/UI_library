import { Directive, booleanAttribute, input } from '@angular/core';

import type { TInputSize, TInputState } from './input.types';

@Directive({
  selector: 'input[tInput]',
  standalone: true,
  host: {
    class: 't-input',
    '[class.t-input--sm]': "tSize() === 'sm'",
    '[class.t-input--md]': "tSize() === 'md'",
    '[class.t-input--lg]': "tSize() === 'lg'",
    '[class.t-input--error]': "tState() === 'error'",
    '[class.t-input--fluid]': 'tFluid()',
  },
})
export class TInputDirective {
  readonly tSize = input<TInputSize>('md');
  readonly tState = input<TInputState>('default');
  readonly tFluid = input(false, { transform: booleanAttribute });
}
