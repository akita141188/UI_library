# TButton Standard - Angular v21 UI Library

File chuẩn cho component `TButton`. Dùng file này làm mẫu để viết spec cho các component sau.

Mục tiêu: `TButton` là action component nền tảng của UI Library. API phải dễ dùng, accessibility tốt, theme được bằng CSS Variables, code tối giản, không kéo dependency ngoài.

---

## 1. Mục tiêu

`TButton` dùng cho hành động của người dùng:

```html
<t-button>Lưu</t-button>
<t-button variant="danger">Xóa</t-button>
<t-button loading>Đang lưu</t-button>
```

Không dùng `TButton` cho navigation. Nếu cần navigation thật, sau này làm `t-link` hoặc anchor directive riêng.

---

## 2. File structure

Bắt buộc:

```txt
projects/ui/src/lib/components/button/
  button.component.ts
  button.component.html
  button.component.scss
  button.component.spec.ts
  button.types.ts
  button-icon.directive.ts
```

Không dùng:

```txt
button.ts
button.html
button.scss
```

---

## 3. Public API export

Trong `projects/ui/src/public-api.ts`:

```ts
export * from './lib/components/button/button.component';
export * from './lib/components/button/button-icon.directive';
export * from './lib/components/button/button.types';
```

Không export file demo.

---

## 4. Public types

```ts
export type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'text'
  | 'link';

export type TButtonSize = 'sm' | 'md' | 'lg';

export type TButtonType = 'button' | 'submit' | 'reset';

export type TButtonIconPosition = 'left' | 'right';

```

---

## 5. Public API

Inputs:

```ts
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
ariaLabelAttr = input<string | null>(null, { alias: 'aria-label' });
tabindex = input<number | null, unknown>(null, {
  transform: (value) => (value == null ? null : numberAttribute(value)),
});
```

Output:

```ts
clicked = output<MouseEvent>();
```

Không thêm trong version này:

- `tooltip`
- `routerLink`
- `badge`
- `severity`
- `style`
- `styleClass`
- `pt`
- `dt`
- `unstyled`
- icon registry
- icon service
- button group
- split button
- ripple

---

## 6. Behavior

`TButton` phải:

- Render native `<button>`.
- Default `type="button"`.
- Support `type="button" | "submit" | "reset"`.
- Khi `disabled` hoặc `loading`, native button phải disabled.
- Khi `disabled` hoặc `loading`, không emit `clicked`.
- Khi loading, set `aria-busy="true"`.
- Khi không loading, không có `aria-busy`.
- `iconOnly` phải có accessible name qua `aria-label` hoặc `ariaLabel`.
- `aria-label` ưu tiên hơn `ariaLabel` nếu truyền cả hai.
- `variant="link"` vẫn là button action, không phải navigation link.

---

## 7. Icon behavior

Hỗ trợ 4 kiểu icon:

### 7.1 Text icon

```html
<t-button icon="+">Create</t-button>
<t-button icon=">" iconPosition="right">Next</t-button>
```

### 7.2 Image/SVG icon qua `iconSrc`

```html
<t-button iconSrc="assets/icons/save.svg">Save</t-button>
<t-button iconSrc="assets/images/avatar.png">Avatar</t-button>
```

`iconSrc` render bằng `<img>`, có `alt=""` và `aria-hidden="true"`.

### 7.3 TemplateRef icon

```html
<ng-template #viewIcon>
  <app-view-icon />
</ng-template>

<t-button [icon]="viewIcon">View</t-button>
<t-button [icon]="viewIcon" iconPosition="right">View</t-button>
```

### 7.4 Projected icon qua directive

```html
<t-button>
  <app-view-icon tButtonIcon />
  View
</t-button>

<t-button iconPosition="right">
  <app-view-icon tButtonIcon />
  View
</t-button>
```

Priority khi truyền nhiều nguồn icon:

1. Projected icon qua `tButtonIcon`.
2. `iconSrc`.
3. `TemplateRef`.
4. Text icon.

Nếu dev mode và truyền nhiều nguồn icon cùng lúc thì warning.

---

## 8. Accessibility

Bắt buộc:

- Native button dùng `[disabled]` thật.
- `iconOnly` phải có `aria-label` hoặc `ariaLabel`.
- `aria-label` bind xuống native `<button>`.
- Loading có `aria-busy="true"`.
- Icon/spinner decorative dùng `aria-hidden="true"`.
- Image icon dùng `alt=""`.
- Focus-visible rõ.
- Không đặt `<ng-content>` trong `@if/@else/@for/@switch`; nếu cần ẩn thì ẩn wrapper bằng `[hidden]` hoặc class.

---

## 9. Style standard

Bắt buộc:

- SCSS scoped theo component.
- CSS class dùng prefix `t-button`.
- BEM nhẹ: `.t-button__icon`, `.t-button--primary`.
- Dùng CSS Variables.
- Có focus ring qua `--t-button-ring`.
- Variant intent override ring riêng: secondary/success/info/warning/danger.
- Có `box-sizing: border-box`.
- Label có `min-width: 0`.
- Có `prefers-reduced-motion` nếu dùng spinner animation/transition.
- Icon-only width bằng size button.
- Fluid host và button full width.

---

## 10. Demo requirements

Demo page riêng:

```txt
projects/demo/src/app/pages/button-demo/
  button-demo.component.ts
  button-demo.component.html
  button-demo.component.scss
```

Demo tối thiểu phải có section:

- Basic.
- Variants.
- Sizes.
- Loading / Disabled.
- Icons.
- Template icon.
- Custom projected icon.
- Icon only.
- Rounded / Raised.
- Fluid.

`variant="link"` demo phải dùng action text, ví dụ:

```html
<t-button variant="link">Reset filter</t-button>
```

Không dùng text navigation kiểu `Go to profile`.

---

## 11. Test requirements

`button.component.spec.ts` phải test tối thiểu:

- Component tạo được.
- Render projected content.
- Default type là `button`.
- `type="submit"` và `type="reset"` bind đúng nếu có test thêm.
- Apply variant class.
- Apply size class.
- Disabled true thì native button disabled.
- Loading true thì native button disabled và `aria-busy="true"`.
- Không loading thì không có `aria-busy`.
- Emit `clicked` khi enabled.
- Không emit khi disabled.
- Không emit khi loading.
- `ariaLabel` compatibility input hoạt động.
- Host `aria-label` bind xuống native button.
- `aria-label` ưu tiên hơn `ariaLabel`.
- Warning khi icon-only thiếu accessible label.
- `iconSrc` render `<img>` đúng.
- Text icon render đúng.
- `iconPosition="right"` hoạt động.
- TemplateRef icon render đúng.
- Projected icon render đúng.
- Priority icon đúng.
- Không render duplicate icon.
- Icon-only không hiện label.
- Loading hiện spinner và ẩn icon.

---

## 12. Không được làm

Không được:

- Không thêm tooltip vào button.
- Không thêm PrimeNG/CDK Overlay vào button.
- Không biến `variant="link"` thành router/navigation.
- Không thêm service/helper/abstraction không cần.
- Không auto detect projected text để tự suy ra `iconOnly` nếu làm code phức tạp.
- Không dùng icon class heuristic kiểu `icon.includes(' ') || icon.includes('-')`.
- Không tạo `button.ts` thay cho `button.component.ts`.

---

## 13. Acceptance checklist

- [ ] `TButton` standalone.
- [ ] Selector là `t-button`.
- [ ] `ChangeDetectionStrategy.OnPush`.
- [ ] File name đúng suffix Angular.
- [ ] Render native `<button>`.
- [ ] Default type là `button`.
- [ ] Disabled/loading disable native button.
- [ ] Disabled/loading không emit `clicked`.
- [ ] `aria-label` hoạt động.
- [ ] `ariaLabel` compatibility còn chạy nếu giữ.
- [ ] Icon-only thiếu label có warning dev mode.
- [ ] Text icon hoạt động.
- [ ] `iconSrc` hỗ trợ SVG/PNG/JPG/ảnh bất kỳ.
- [ ] TemplateRef icon hoạt động.
- [ ] Projected icon qua `tButtonIcon` hoạt động.
- [ ] `iconPosition="right"` hoạt động với mọi kiểu icon.
- [ ] Không render trùng icon.
- [ ] Không có `<ng-content>` trong control-flow block.
- [ ] Focus ring dùng `--t-button-ring`.
- [ ] Variant intent có ring riêng.
- [ ] Có reduced motion.
- [ ] Có unit test.
- [ ] Export public API đúng.
- [ ] Demo page riêng.
- [ ] `ng build ui` pass.
- [ ] Tests pass.

---

# 14. Reference implementation

## 14.1 `button.types.ts`

```ts
export type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'text'
  | 'link';

export type TButtonSize = 'sm' | 'md' | 'lg';

export type TButtonType = 'button' | 'submit' | 'reset';

export type TButtonIconPosition = 'left' | 'right';

```

## 14.2 `button-icon.directive.ts`

```ts
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

```

## 14.3 `button.component.ts`

```ts
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

```

## 14.4 `button.component.html`

```html
<button
  class="t-button"
  [class.t-button--primary]="variant() === 'primary'"
  [class.t-button--secondary]="variant() === 'secondary'"
  [class.t-button--success]="variant() === 'success'"
  [class.t-button--info]="variant() === 'info'"
  [class.t-button--warning]="variant() === 'warning'"
  [class.t-button--danger]="variant() === 'danger'"
  [class.t-button--outline]="variant() === 'outline'"
  [class.t-button--ghost]="variant() === 'ghost'"
  [class.t-button--text]="variant() === 'text'"
  [class.t-button--link]="variant() === 'link'"
  [class.t-button--sm]="size() === 'sm'"
  [class.t-button--md]="size() === 'md'"
  [class.t-button--lg]="size() === 'lg'"
  [class.t-button--fluid]="fluid()"
  [class.t-button--rounded]="rounded()"
  [class.t-button--raised]="raised()"
  [class.t-button--icon-only]="iconOnly()"
  [class.t-button--loading]="loading()"
  [class.t-button--icon-right]="iconOnRight()"
  [type]="type()"
  [disabled]="isDisabled()"
  [attr.aria-label]="accessibleLabel()"
  [attr.aria-busy]="loading() ? 'true' : null"
  [attr.tabindex]="tabindex()"
  (click)="onClick($event)"
>
  <span class="t-button__spinner" [hidden]="!loading()" aria-hidden="true"></span>

  <span class="t-button__icon" [hidden]="loading() || !showIcon()" aria-hidden="true">
    <ng-content select="[tButtonIcon]" />

    @if (!loading() && !hasProjectedIcon()) {
      @if (iconSrc()) {
        <img class="t-button__icon-image" [src]="iconSrc()" alt="" aria-hidden="true" />
      } @else if (iconTemplate(); as templateIcon) {
        <ng-container [ngTemplateOutlet]="templateIcon" />
      } @else if (iconText()) {
        <span>{{ iconText() }}</span>
      }
    }
  </span>

  <span class="t-button__label" [hidden]="iconOnly()">
    <ng-content />
  </span>
</button>

```

## 14.5 `button.component.scss`

```scss
:host {
  display: inline-flex;
}

:host(.t-button-host--fluid) {
  display: flex;
  width: 100%;
}

.t-button {
  --t-button-bg: var(--t-primary, #2563eb);
  --t-button-color: var(--t-primary-contrast, #ffffff);
  --t-button-border: var(--t-button-bg);
  --t-button-hover-bg: var(--t-primary-hover, #1d4ed8);
  --t-button-icon-size: 1rem;
  --t-button-ring: var(--t-primary-ring, rgba(37, 99, 235, 0.35));
  --t-button-size: 2.5rem;

  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: var(--t-button-size);
  padding: 0 1rem;
  border: 1px solid var(--t-button-border);
  border-radius: var(--t-button-radius, 0.625rem);
  background: var(--t-button-bg);
  color: var(--t-button-color);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition:
    background-color var(--t-transition, 150ms ease),
    box-shadow var(--t-transition, 150ms ease),
    transform var(--t-transition, 150ms ease);
}

.t-button:hover:not(:disabled) {
  background: var(--t-button-hover-bg);
  border-color: var(--t-button-hover-border, var(--t-button-hover-bg));
}

.t-button:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--t-surface, #ffffff),
    0 0 0 4px var(--t-button-ring);
}

.t-button:active:not(:disabled) {
  transform: translateY(1px) scale(0.99);
}

.t-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
  transform: none;
}

.t-button--sm {
  --t-button-size: 2rem;

  padding: 0 0.75rem;
  font-size: 0.8125rem;
}

.t-button--md {
  --t-button-size: 2.5rem;

  padding: 0 1rem;
  font-size: 0.875rem;
}

.t-button--lg {
  --t-button-size: 3rem;

  padding: 0 1.25rem;
  font-size: 0.9375rem;
}

.t-button--fluid {
  width: 100%;
}

.t-button--rounded {
  border-radius: 999px;
}

.t-button--raised:not(:disabled) {
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
}

.t-button--raised:hover:not(:disabled) {
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
}

.t-button--icon-only {
  width: var(--t-button-size);
  padding: 0;
}

.t-button--icon-right .t-button__icon {
  order: 2;
}

.t-button__spinner[hidden],
.t-button__icon[hidden],
.t-button__label[hidden] {
  display: none;
}

.t-button__icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: var(--t-button-icon-size);
  height: var(--t-button-icon-size);
}

.t-button__icon-image,
.t-button__icon svg {
  display: block;
  width: var(--t-button-icon-size);
  height: var(--t-button-icon-size);
}

.t-button__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 999px;
  animation: t-button-spin 650ms linear infinite;
}

.t-button--secondary {
  --t-button-bg: var(--t-secondary, #64748b);
  --t-button-hover-bg: var(--t-secondary-hover, #475569);
  --t-button-ring: var(--t-secondary-ring, rgba(100, 116, 139, 0.35));
}

.t-button--success {
  --t-button-bg: var(--t-success, #16a34a);
  --t-button-hover-bg: var(--t-success-hover, #15803d);
  --t-button-ring: var(--t-success-ring, rgba(22, 163, 74, 0.35));
}

.t-button--info {
  --t-button-bg: var(--t-info, #0284c7);
  --t-button-hover-bg: var(--t-info-hover, #0369a1);
  --t-button-ring: var(--t-info-ring, rgba(2, 132, 199, 0.35));
}

.t-button--warning {
  --t-button-bg: var(--t-warning, #d97706);
  --t-button-hover-bg: var(--t-warning-hover, #b45309);
  --t-button-ring: var(--t-warning-ring, rgba(217, 119, 6, 0.35));
}

.t-button--danger {
  --t-button-bg: var(--t-danger, #dc2626);
  --t-button-hover-bg: var(--t-danger-hover, #b91c1c);
  --t-button-ring: var(--t-danger-ring, rgba(220, 38, 38, 0.35));
}

.t-button--outline {
  --t-button-bg: transparent;
  --t-button-color: var(--t-text, #111827);
  --t-button-border: var(--t-border, #d1d5db);
  --t-button-hover-bg: var(--t-muted-surface, #f8fafc);
  --t-button-hover-border: var(--t-border-strong, #cbd5e1);
}

.t-button--ghost {
  --t-button-bg: transparent;
  --t-button-color: var(--t-text, #111827);
  --t-button-border: transparent;
  --t-button-hover-bg: var(--t-muted-surface, #f1f5f9);
}

.t-button--text,
.t-button--link {
  --t-button-bg: transparent;
  --t-button-color: var(--t-primary, #2563eb);
  --t-button-border: transparent;
  --t-button-hover-bg: transparent;
  --t-button-hover-border: transparent;
}

.t-button--text:hover:not(:disabled) {
  color: var(--t-primary-hover, #1d4ed8);
}

.t-button--link {
  height: auto;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@keyframes t-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .t-button {
    transition: none;
  }

  .t-button__spinner {
    animation: none;
  }
}
```

## 14.6 `button.component.spec.ts`

```ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TButtonIcon } from './button-icon.directive';
import { TButton } from './button.component';

@Component({
  standalone: true,
  imports: [TButton, TButtonIcon],
  template: `
    <t-button>
      <svg tButtonIcon viewBox="0 0 24 24"></svg>
      Save
    </t-button>
  `,
})
class TButtonHost {}

@Component({
  standalone: true,
  imports: [TButton],
  template: `<t-button iconOnly aria-label="Create" icon="+"></t-button>`,
})
class TButtonAriaLabelHost {}

@Component({
  standalone: true,
  imports: [TButton],
  template: `<t-button iconOnly aria-label="Native" ariaLabel="Compat" icon="+"></t-button>`,
})
class TButtonAriaLabelPriorityHost {}

@Component({
  standalone: true,
  imports: [TButton, TButtonIcon],
  template: `
    <t-button iconPosition="right">
      <svg tButtonIcon viewBox="0 0 24 24"></svg>
      View
    </t-button>
  `,
})
class TButtonProjectedRightHost {}

@Component({
  standalone: true,
  imports: [TButton],
  template: `
    <ng-template #viewIcon>
      <span class="template-icon">view</span>
    </ng-template>

    <t-button [icon]="viewIcon" iconPosition="right">View</t-button>
  `,
})
class TButtonTemplateIconHost {}

@Component({
  standalone: true,
  imports: [TButton],
  template: `
    <ng-template #viewIcon>
      <span class="template-icon">view</span>
    </ng-template>

    <t-button [icon]="viewIcon" iconSrc="assets/icons/save.svg">Save</t-button>
  `,
})
class TButtonIconSrcPriorityHost {}

@Component({
  standalone: true,
  imports: [TButton, TButtonIcon],
  template: `
    <t-button icon="+" iconSrc="assets/icons/save.svg">
      <svg tButtonIcon viewBox="0 0 24 24"></svg>
      Save
    </t-button>
  `,
})
class TButtonProjectedPriorityHost {}

@Component({
  standalone: true,
  imports: [TButton, TButtonIcon],
  template: `
    <t-button loading>
      <svg tButtonIcon viewBox="0 0 24 24"></svg>
      Saving
    </t-button>
  `,
})
class TButtonProjectedLoadingHost {}

@Component({
  standalone: true,
  imports: [TButton],
  template: `<t-button iconOnly aria-label="Save" icon="+">Hidden label</t-button>`,
})
class TButtonIconOnlyLabelHost {}

describe('TButton', () => {
  let component: TButton;
  let fixture: ComponentFixture<TButton>;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TButton,
        TButtonHost,
        TButtonAriaLabelHost,
        TButtonAriaLabelPriorityHost,
        TButtonProjectedRightHost,
        TButtonTemplateIconHost,
        TButtonIconSrcPriorityHost,
        TButtonProjectedPriorityHost,
        TButtonProjectedLoadingHost,
        TButtonIconOnlyLabelHost,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TButton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected content', () => {
    const hostFixture = TestBed.createComponent(TButtonHost);
    hostFixture.detectChanges();

    const label = hostFixture.nativeElement.querySelector('.t-button__label') as HTMLElement;
    const icon = hostFixture.nativeElement.querySelector('[tButtonIcon]') as SVGElement;

    expect(label.textContent).toContain('Save');
    expect(label.querySelector('[tButtonIcon]')).toBeFalsy();
    expect(icon.classList.contains('t-button__custom-icon')).toBe(true);
  });

  it('should use button as default type', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('button');
  });

  it('should bind submit type to the native button', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('submit');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('t-button--danger')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('t-button--lg')).toBe(true);
  });

  it('should disable when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('should disable when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('should not set aria-busy when loading is false', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-busy')).toBeNull();
  });

  it('should emit clicked when enabled', () => {
    const clicks: MouseEvent[] = [];
    component.clicked.subscribe((event) => clicks.push(event));

    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();

    expect(clicks).toHaveLength(1);
    expect(clicks[0]).toBeInstanceOf(MouseEvent);
  });

  it('should not emit clicked when disabled', () => {
    const clicks: MouseEvent[] = [];
    component.clicked.subscribe((event) => clicks.push(event));

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();

    expect(clicks).toHaveLength(0);
  });

  it('should not emit clicked when loading', () => {
    const clicks: MouseEvent[] = [];
    component.clicked.subscribe((event) => clicks.push(event));

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();

    expect(clicks).toHaveLength(0);
  });

  it('should set aria-label through the ariaLabel compatibility input', () => {
    fixture.componentRef.setInput('icon', '?');
    fixture.componentRef.setInput('iconOnly', true);
    fixture.componentRef.setInput('ariaLabel', 'Search');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('t-button--icon-only')).toBe(true);
    expect(button.getAttribute('aria-label')).toBe('Search');
  });

  it('should pass host aria-label down to native button', () => {
    const hostFixture = TestBed.createComponent(TButtonAriaLabelHost);
    hostFixture.detectChanges();

    const button = hostFixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Create');
  });

  it('should prefer aria-label over ariaLabel when both are provided', () => {
    const hostFixture = TestBed.createComponent(TButtonAriaLabelPriorityHost);
    hostFixture.detectChanges();

    const button = hostFixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Native');
  });

  it('should warn when icon-only button has no accessible label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    fixture.componentRef.setInput('icon', '+');
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();

    expect(warn).toHaveBeenCalledWith(
      'TButton: iconOnly buttons should provide aria-label or ariaLabel.',
    );
  });

  it('should render iconSrc as an image', () => {
    fixture.componentRef.setInput('iconSrc', 'assets/icons/save.svg');
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.t-button__icon-image') as HTMLImageElement;

    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('assets/icons/save.svg');
    expect(image.getAttribute('alt')).toBe('');
    expect(image.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render text icon', () => {
    fixture.componentRef.setInput('icon', '+');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.t-button__icon') as HTMLElement;

    expect(icon.textContent).toContain('+');
  });

  it('should apply right icon position to iconSrc', () => {
    fixture.componentRef.setInput('iconSrc', 'assets/icons/save.svg');
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('t-button--icon-right')).toBe(true);
  });

  it('should render TemplateRef icon and honor right icon position', () => {
    const hostFixture = TestBed.createComponent(TButtonTemplateIconHost);
    hostFixture.detectChanges();

    const button = hostFixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const icon = hostFixture.nativeElement.querySelector('.template-icon') as HTMLElement;

    expect(icon.textContent).toContain('view');
    expect(button.classList.contains('t-button--icon-right')).toBe(true);
  });

  it('should honor right icon position for projected icon', () => {
    const hostFixture = TestBed.createComponent(TButtonProjectedRightHost);
    hostFixture.detectChanges();

    const button = hostFixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const icon = hostFixture.nativeElement.querySelector('[tButtonIcon]') as SVGElement;

    expect(icon).toBeTruthy();
    expect(button.classList.contains('t-button--icon-right')).toBe(true);
  });

  it('should prioritize iconSrc over TemplateRef icon', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const hostFixture = TestBed.createComponent(TButtonIconSrcPriorityHost);
    hostFixture.detectChanges();

    const image = hostFixture.nativeElement.querySelector(
      '.t-button__icon-image',
    ) as HTMLImageElement;
    const templateIcon = hostFixture.nativeElement.querySelector('.template-icon') as HTMLElement;

    expect(image).toBeTruthy();
    expect(templateIcon).toBeFalsy();
  });

  it('should prioritize projected icon over other icon sources', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const hostFixture = TestBed.createComponent(TButtonProjectedPriorityHost);
    hostFixture.detectChanges();

    const iconSlot = hostFixture.nativeElement.querySelector('.t-button__icon') as HTMLElement;
    const projectedIcon = hostFixture.nativeElement.querySelector('[tButtonIcon]') as SVGElement;
    const image = hostFixture.nativeElement.querySelector(
      '.t-button__icon-image',
    ) as HTMLImageElement;

    expect(projectedIcon).toBeTruthy();
    expect(image).toBeFalsy();
    expect(iconSlot.textContent).not.toContain('+');
    expect(warn).toHaveBeenCalledWith(
      'TButton: multiple icon sources provided; projected icon, iconSrc, then icon are used in priority order.',
    );
  });

  it('should not render duplicate icons when multiple icon sources are provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    fixture.componentRef.setInput('icon', '+');
    fixture.componentRef.setInput('iconSrc', 'assets/icons/save.svg');
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.t-button__icon');
    const image = fixture.nativeElement.querySelector('.t-button__icon-image') as HTMLImageElement;

    expect(icons).toHaveLength(1);
    expect(image).toBeTruthy();
    expect(icons[0].textContent).not.toContain('+');
    expect(warn).toHaveBeenCalledWith(
      'TButton: multiple icon sources provided; projected icon, iconSrc, then icon are used in priority order.',
    );
  });

  it('should hide projected label when iconOnly is true', () => {
    const hostFixture = TestBed.createComponent(TButtonIconOnlyLabelHost);
    hostFixture.detectChanges();

    const label = hostFixture.nativeElement.querySelector('.t-button__label') as HTMLElement;

    expect(label.hidden).toBe(true);
    expect(label.textContent).toContain('Hidden label');
  });

  it('should show spinner and hide projected icon while loading', () => {
    const hostFixture = TestBed.createComponent(TButtonProjectedLoadingHost);
    hostFixture.detectChanges();

    const spinner = hostFixture.nativeElement.querySelector('.t-button__spinner') as HTMLElement;
    const icon = hostFixture.nativeElement.querySelector('.t-button__icon') as HTMLElement;

    expect(spinner.hidden).toBe(false);
    expect(icon.hidden).toBe(true);
  });
});

```
