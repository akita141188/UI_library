import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  contentChild,
  computed,
  effect,
  input,
  isDevMode,
  numberAttribute,
  output,
  type TemplateRef,
} from '@angular/core';

import { TButtonIcon } from './button-icon.directive';
import { TButtonIconPosition, TButtonSize, TButtonType, TButtonVariant } from './button.types';

@Component({
  selector: 't-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.t-button-host--fluid]': 'fluid()',
  },
})
export class TButton {
  variant = input<TButtonVariant>('primary');
  size = input<TButtonSize>('md');
  type = input<TButtonType>('button');
  disabled = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  fluid = input(false, { transform: booleanAttribute });
  rounded = input(false, { transform: booleanAttribute });
  raised = input(false, { transform: booleanAttribute });
  iconOnly = input(false, { transform: booleanAttribute });
  icon = input<string | TemplateRef<unknown> | null>(null);
  iconSrc = input<string | null>(null);
  iconPosition = input<TButtonIconPosition>('left');
  ariaLabel = input<string | null>(null);
  // eslint-disable-next-line @angular-eslint/no-input-rename -- Keep native aria-label passthrough for icon-only accessibility.
  ariaLabelAttr = input<string | null>(null, { alias: 'aria-label' });
  tabindex = input<number | null, unknown>(null, {
    transform: (value) => (value == null ? null : numberAttribute(value)),
  });

  clicked = output<MouseEvent>();

  readonly projectedIcon = contentChild(TButtonIcon);

  isDisabled = computed(() => this.disabled() || this.loading());
  hasProjectedIcon = computed(() => !!this.projectedIcon());
  hasIconSrc = computed(() => !!this.iconSrc());
  iconTemplate = computed(() => {
    const icon = this.icon();

    return icon && typeof icon !== 'string' ? icon : null;
  });
  iconText = computed(() => {
    const icon = this.icon();

    return typeof icon === 'string' && icon ? icon : null;
  });
  hasIconInput = computed(() => !!this.iconTemplate() || !!this.iconText());
  hasIcon = computed(() => this.hasProjectedIcon() || this.hasIconSrc() || this.hasIconInput());
  showIcon = computed(() => !this.loading() && this.hasIcon());
  iconOnRight = computed(
    () => this.showIcon() && !this.iconOnly() && this.iconPosition() === 'right',
  );
  accessibleLabel = computed(() => this.ariaLabelAttr() ?? this.ariaLabel());
  iconSourceCount = computed(
    () => Number(this.hasProjectedIcon()) + Number(this.hasIconSrc()) + Number(this.hasIconInput()),
  );

  private warnedMissingAriaLabel = false;
  private warnedMultipleIconSources = false;

  constructor() {
    effect(() => {
      if (
        isDevMode() &&
        this.iconOnly() &&
        !this.accessibleLabel() &&
        !this.warnedMissingAriaLabel
      ) {
        console.warn('TButton: iconOnly buttons should provide aria-label or ariaLabel.');
        this.warnedMissingAriaLabel = true;
      }

      if (isDevMode() && this.iconSourceCount() > 1 && !this.warnedMultipleIconSources) {
        console.warn(
          'TButton: multiple icon sources provided; projected icon, iconSrc, then icon are used in priority order.',
        );
        this.warnedMultipleIconSources = true;
      }
    });
  }

  onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
