# Skill: TButton Component - Angular v21 UI Library

> Skill này dùng để hướng dẫn AI/codegen xây dựng component `TButton` cho UI Library Angular v21.  
> Component học cách tổ chức API và trải nghiệm sử dụng từ PrimeNG Button, nhưng **không copy PrimeNG**, **không phụ thuộc PrimeNG**, và phải tuân thủ rule riêng của UI Library/TRỤC.

---

## 1. Bối cảnh dự án

Dự án là UI Component Library dùng Angular v21.

Quy tắc nền bắt buộc:

- Angular v21.
- Standalone components.
- TypeScript strict mode.
- SCSS.
- CSS Variables cho theme.
- Selector public dùng prefix `t-`.
- Ưu tiên Angular built-in trước.
- Ưu tiên Angular CDK nếu cần nền tảng phức tạp.
- Không dùng PrimeNG.
- Không dùng Angular Material/Bootstrap/Ant Design làm nền.
- Không thêm dependency ngoài nếu chưa thật sự cần.
- Code tối giản, dễ đọc, dễ bảo trì.
- Không over-engineer.
- Không tạo helper/service/token/abstraction nếu chưa thật sự cần.

Component cần tạo:

```html
<t-button>Save</t-button>
```

Class:

```ts
export class TButton {}
```

Selector:

```ts
selector: 't-button'
```

---

## 2. Mục tiêu của TButton

`TButton` là button nền tảng của UI Library.

Mục tiêu:

- Dễ dùng như các UI library phổ biến.
- API ngắn, rõ, không rườm rà.
- Dùng được trong form, dashboard, admin, portal.
- Hỗ trợ các trạng thái phổ biến: variant, severity, size, disabled, loading, icon.
- Có accessibility cơ bản tốt.
- Có theme bằng CSS Variables.
- Dễ mở rộng sau này nhưng không tạo complexity sớm.

Không làm ở phiên bản đầu:

- Không làm directive kiểu `tButton` nếu chưa cần.
- Không làm ButtonGroup nếu chưa được yêu cầu.
- Không làm Ripple nếu chưa có directive chung.
- Không làm global config/token.
- Không làm pass-through API phức tạp kiểu PrimeNG `pt`.
- Không làm unstyled mode nếu chưa có hệ thống theme ổn định.
- Không thêm thư viện icon ngoài.

---

## 3. Bài học tham khảo từ PrimeNG Button

PrimeNG Button có các nhóm feature đáng học:

- Basic button.
- Icon button.
- Loading state.
- Severity/color intent.
- Raised/elevated style.
- Rounded/pill style.
- Text button.
- Outlined button.
- Link-style button.
- Icon-only button.
- Badge.
- Size small/normal/large.
- Accessibility bằng native button.

Áp dụng cho `TButton` theo hướng tối giản hơn:

- Giữ API cần thiết.
- Không bê toàn bộ props của PrimeNG.
- Không dùng class/selector/tokens của PrimeNG.
- Không support mọi case ngay từ đầu.
- Chỉ ưu tiên case dùng thật nhiều.

---

## 4. API public đề xuất

### 4.1. Cách dùng cơ bản

```html
<t-button>Save</t-button>
```

```html
<t-button variant="primary">Save</t-button>
<t-button variant="secondary">Cancel</t-button>
<t-button variant="danger">Delete</t-button>
```

```html
<t-button size="sm">Small</t-button>
<t-button>Default</t-button>
<t-button size="lg">Large</t-button>
```

```html
<t-button [loading]="saving">Save</t-button>
<t-button [disabled]="form.invalid">Submit</t-button>
```

```html
<t-button icon="save">Save</t-button>
<t-button icon="search" ariaLabel="Search" />
```

---

## 5. Inputs

Chỉ tạo các input dưới đây ở bản đầu.

| Input | Type | Default | Mục đích |
|---|---|---:|---|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type. Không default `submit` để tránh submit form ngoài ý muốn. |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' \| 'ghost' \| 'outline' \| 'text' \| 'link'` | `'primary'` | Kiểu hiển thị/chủ đích của button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Kích thước button. |
| `disabled` | `boolean` | `false` | Disable button. |
| `loading` | `boolean` | `false` | Trạng thái đang xử lý. Khi loading thì button nên disabled. |
| `fluid` | `boolean` | `false` | Full width container. |
| `rounded` | `boolean` | `false` | Bo tròn kiểu pill. |
| `raised` | `boolean` | `false` | Có shadow/elevation nhẹ. |
| `icon` | `string \| undefined` | `undefined` | Tên icon nội bộ đơn giản hoặc text key. Không bắt buộc có icon system ngay. |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Vị trí icon khi có label. |
| `iconOnly` | `boolean` | `false` | Button chỉ có icon, dạng square. |
| `ariaLabel` | `string \| undefined` | `undefined` | Label cho screen reader, bắt buộc khi icon-only không có text. |
| `tabIndex` | `number \| undefined` | `undefined` | Native tabindex nếu cần. |

### Lưu ý API

- Dùng `variant`, không dùng `severity`, để dễ hiểu hơn cho library riêng.
- Không tạo cả `outlined`, `text`, `link` boolean vì dễ conflict. Gộp vào `variant`.
- Không tạo `styleClass` nếu Angular đã có `class` binding từ host usage.
- Không tạo `style` input riêng nếu native `[style]`/CSS variable/class đã xử lý được.
- Không tạo `badge` ở version đầu. Badge nên là component riêng sau này nếu cần.
- Không tạo `plain`, `dt`, `pt`, `ptOptions`, `unstyled` ở version đầu.

---

## 6. Outputs

Không cần tạo output riêng cho click/focus/blur ở bản đầu.

Lý do:

- `t-button` render native `<button>` bên trong component, nhưng event native từ host không tự giống button thật.
- Nếu cần support `(clicked)`, chỉ tạo 1 output duy nhất.
- Tuy nhiên nên ưu tiên API Angular đơn giản.

Đề xuất bản đầu:

```ts
clicked = output<MouseEvent>();
```

Usage:

```html
<t-button (clicked)="save()">Save</t-button>
```

Quy tắc:

- Khi `disabled` hoặc `loading`, không emit `clicked`.
- Không tạo `onClick`, `onFocus`, `onBlur` kiểu PrimeNG vì không hợp convention Angular hiện đại.
- Nếu sau này thật sự cần focus/blur, dùng native method hoặc thêm output sau.

---

## 7. Component API TypeScript

Nên dùng Angular signal-style API nếu project đang dùng.

Ví dụ type đề xuất:

```ts
export type TButtonType = 'button' | 'submit' | 'reset';
export type TButtonSize = 'sm' | 'md' | 'lg';
export type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'
  | 'text'
  | 'link';
export type TButtonIconPosition = 'left' | 'right';
```

Component skeleton:

```ts
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 't-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.t-button-host-fluid]': 'fluid()',
  },
})
export class TButton {
  type = input<TButtonType>('button');
  variant = input<TButtonVariant>('primary');
  size = input<TButtonSize>('md');
  disabled = input(false);
  loading = input(false);
  fluid = input(false);
  rounded = input(false);
  raised = input(false);
  icon = input<string>();
  iconPosition = input<TButtonIconPosition>('left');
  iconOnly = input(false);
  ariaLabel = input<string>();
  tabIndex = input<number>();

  clicked = output<MouseEvent>();

  isDisabled = computed(() => this.disabled() || this.loading());

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

Chỉ thêm `computed` nếu thật sự dùng trong template. Không tạo helper class builder nếu template/class binding xử lý được.

---

## 8. Template đề xuất

File:

```txt
projects/ui/src/lib/components/button/button.html
```

Template nên đơn giản:

```html
<button
  class="t-button"
  [class.t-button-primary]="variant() === 'primary'"
  [class.t-button-secondary]="variant() === 'secondary'"
  [class.t-button-success]="variant() === 'success'"
  [class.t-button-info]="variant() === 'info'"
  [class.t-button-warning]="variant() === 'warning'"
  [class.t-button-danger]="variant() === 'danger'"
  [class.t-button-ghost]="variant() === 'ghost'"
  [class.t-button-outline]="variant() === 'outline'"
  [class.t-button-text]="variant() === 'text'"
  [class.t-button-link]="variant() === 'link'"
  [class.t-button-sm]="size() === 'sm'"
  [class.t-button-md]="size() === 'md'"
  [class.t-button-lg]="size() === 'lg'"
  [class.t-button-fluid]="fluid()"
  [class.t-button-rounded]="rounded()"
  [class.t-button-raised]="raised()"
  [class.t-button-icon-only]="iconOnly()"
  [class.t-button-loading]="loading()"
  [type]="type()"
  [disabled]="isDisabled()"
  [attr.aria-label]="ariaLabel()"
  [attr.aria-busy]="loading() ? 'true' : null"
  [attr.tabindex]="tabIndex()"
  (click)="onClick($event)"
>
  @if (loading()) {
    <span class="t-button-spinner" aria-hidden="true"></span>
  } @else if (icon() && iconPosition() === 'left') {
    <span class="t-button-icon" aria-hidden="true">{{ icon() }}</span>
  }

  @if (!iconOnly()) {
    <span class="t-button-label">
      <ng-content />
    </span>
  }

  @if (!loading() && icon() && iconPosition() === 'right' && !iconOnly()) {
    <span class="t-button-icon" aria-hidden="true">{{ icon() }}</span>
  }
</button>
```

### Lưu ý template

- Dùng native `<button>` để có keyboard support mặc định.
- Không tự xử lý Enter/Space vì native button đã hỗ trợ.
- Spinner dùng CSS, không thêm icon dependency.
- `icon` ở bản đầu có thể render text/key. Khi có icon component riêng, thay sau.
- Nếu `iconOnly=true`, user phải truyền `ariaLabel`.
- Không dùng `ngClass` nếu class binding trực tiếp đủ rõ.

---

## 9. Style đề xuất

File:

```txt
projects/ui/src/lib/components/button/button.scss
```

Style phải dùng CSS Variables.

```scss
:host {
  display: inline-flex;
}

:host(.t-button-host-fluid) {
  display: flex;
  width: 100%;
}

.t-button {
  --t-button-bg: var(--t-primary, #2563eb);
  --t-button-color: #ffffff;
  --t-button-border: var(--t-button-bg);
  --t-button-hover-bg: #1d4ed8;
  --t-button-hover-border: var(--t-button-hover-bg);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: auto;
  border: 1px solid var(--t-button-border);
  border-radius: var(--t-button-radius, var(--t-radius, 0.75rem));
  background: var(--t-button-bg);
  color: var(--t-button-color);
  font: inherit;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background var(--t-transition, 150ms ease),
    border-color var(--t-transition, 150ms ease),
    color var(--t-transition, 150ms ease),
    box-shadow var(--t-transition, 150ms ease),
    transform var(--t-transition, 150ms ease);
}

.t-button:hover:not(:disabled) {
  background: var(--t-button-hover-bg);
  border-color: var(--t-button-hover-border);
}

.t-button:focus-visible {
  outline: 2px solid var(--t-button-focus-ring, color-mix(in srgb, var(--t-button-bg), white 55%));
  outline-offset: 2px;
}

.t-button:active:not(:disabled) {
  transform: translateY(1px);
}

.t-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.t-button-sm {
  min-height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}

.t-button-md {
  min-height: 2.5rem;
  padding: 0 1rem;
  font-size: 0.9375rem;
}

.t-button-lg {
  min-height: 3rem;
  padding: 0 1.25rem;
  font-size: 1rem;
}

.t-button-fluid {
  width: 100%;
}

.t-button-rounded {
  border-radius: 999px;
}

.t-button-raised {
  box-shadow: var(--t-button-shadow, var(--t-shadow, 0 10px 25px rgba(15, 23, 42, 0.08)));
}

.t-button-icon-only {
  aspect-ratio: 1;
  padding: 0;
}

.t-button-icon-only.t-button-sm {
  width: 2rem;
}

.t-button-icon-only.t-button-md {
  width: 2.5rem;
}

.t-button-icon-only.t-button-lg {
  width: 3rem;
}

.t-button-icon,
.t-button-spinner {
  flex: 0 0 auto;
}

.t-button-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-button-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: t-button-spin 700ms linear infinite;
}

@keyframes t-button-spin {
  to {
    transform: rotate(360deg);
  }
}
```

Variant styles:

```scss
.t-button-primary {
  --t-button-bg: var(--t-primary, #2563eb);
  --t-button-hover-bg: var(--t-primary-hover, #1d4ed8);
}

.t-button-secondary {
  --t-button-bg: var(--t-secondary, #64748b);
  --t-button-hover-bg: var(--t-secondary-hover, #475569);
}

.t-button-success {
  --t-button-bg: var(--t-success, #16a34a);
  --t-button-hover-bg: var(--t-success-hover, #15803d);
}

.t-button-info {
  --t-button-bg: var(--t-info, #0284c7);
  --t-button-hover-bg: var(--t-info-hover, #0369a1);
}

.t-button-warning {
  --t-button-bg: var(--t-warning, #d97706);
  --t-button-hover-bg: var(--t-warning-hover, #b45309);
}

.t-button-danger {
  --t-button-bg: var(--t-danger, #dc2626);
  --t-button-hover-bg: var(--t-danger-hover, #b91c1c);
}

.t-button-ghost {
  --t-button-bg: transparent;
  --t-button-color: var(--t-text, #111827);
  --t-button-border: transparent;
  --t-button-hover-bg: var(--t-muted-surface, #f1f5f9);
  --t-button-hover-border: transparent;
}

.t-button-outline {
  --t-button-bg: transparent;
  --t-button-color: var(--t-primary, #2563eb);
  --t-button-border: currentColor;
  --t-button-hover-bg: color-mix(in srgb, var(--t-primary, #2563eb), transparent 90%);
  --t-button-hover-border: currentColor;
}

.t-button-text,
.t-button-link {
  --t-button-bg: transparent;
  --t-button-color: var(--t-primary, #2563eb);
  --t-button-border: transparent;
  --t-button-hover-bg: color-mix(in srgb, var(--t-primary, #2563eb), transparent 92%);
  --t-button-hover-border: transparent;
}

.t-button-link {
  min-height: auto;
  padding-inline: 0;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
```

### Lưu ý style

- Có thể dùng `color-mix()` nếu project chấp nhận browser support hiện đại.
- Nếu không muốn `color-mix()`, thay bằng CSS variables riêng như `--t-primary-soft`.
- Không hardcode quá nhiều màu; fallback chỉ để component hoạt động khi theme chưa khai báo đủ.
- Không tạo design token quá sâu ngay từ đầu.

---

## 10. Theme variables nên bổ sung

File có thể là:

```txt
projects/ui/src/lib/styles/theme.scss
```

Hoặc file theme hiện có của project.

```scss
:root {
  --t-primary: #2563eb;
  --t-primary-hover: #1d4ed8;
  --t-secondary: #64748b;
  --t-secondary-hover: #475569;
  --t-success: #16a34a;
  --t-success-hover: #15803d;
  --t-info: #0284c7;
  --t-info-hover: #0369a1;
  --t-warning: #d97706;
  --t-warning-hover: #b45309;
  --t-danger: #dc2626;
  --t-danger-hover: #b91c1c;
  --t-surface: #ffffff;
  --t-muted-surface: #f1f5f9;
  --t-text: #111827;
  --t-muted-text: #6b7280;
  --t-border: #e5e7eb;
  --t-radius: 0.75rem;
  --t-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  --t-transition: 150ms ease;
}
```

Chỉ thêm biến chưa có. Nếu project đã có biến tương tự, tận dụng biến cũ.

---

## 11. Accessibility

`TButton` phải đạt mức cơ bản:

- Render native `<button>`.
- Native button tự hỗ trợ `Tab`, `Enter`, `Space`.
- Set `[disabled]` thật trên button.
- Khi loading, set `aria-busy="true"`.
- Spinner/icon phải có `aria-hidden="true"`.
- Icon-only button phải có `ariaLabel`.
- Không dùng `div role="button"`.
- Không tự override keyboard event nếu không cần.

Rule kiểm tra:

```html
<t-button icon="search" iconOnly ariaLabel="Search" />
```

Không nên:

```html
<t-button icon="search" iconOnly />
```

Nếu muốn chặt hơn, có thể cảnh báo trong dev bằng console warning, nhưng **không thêm logic này ở bản đầu** nếu chưa cần.

---

## 12. Demo app tối thiểu

Demo chỉ để test component, không biến thành app phức tạp.

File ví dụ:

```txt
projects/demo/src/app/button-demo.component.ts
```

Demo nên có:

```html
<section class="demo-section">
  <h2>Button</h2>

  <div class="demo-row">
    <t-button>Primary</t-button>
    <t-button variant="secondary">Secondary</t-button>
    <t-button variant="success">Success</t-button>
    <t-button variant="info">Info</t-button>
    <t-button variant="warning">Warning</t-button>
    <t-button variant="danger">Danger</t-button>
  </div>

  <div class="demo-row">
    <t-button variant="outline">Outline</t-button>
    <t-button variant="ghost">Ghost</t-button>
    <t-button variant="text">Text</t-button>
    <t-button variant="link">Link</t-button>
  </div>

  <div class="demo-row">
    <t-button size="sm">Small</t-button>
    <t-button size="md">Medium</t-button>
    <t-button size="lg">Large</t-button>
  </div>

  <div class="demo-row">
    <t-button icon="←">Back</t-button>
    <t-button icon="→" iconPosition="right">Next</t-button>
    <t-button icon="🔍" iconOnly ariaLabel="Search" />
    <t-button loading>Saving</t-button>
    <t-button disabled>Disabled</t-button>
  </div>

  <div class="demo-row demo-fluid">
    <t-button fluid>Full width</t-button>
  </div>
</section>
```

Demo styles tối thiểu:

```scss
.demo-section {
  display: grid;
  gap: 1rem;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.demo-fluid {
  max-width: 24rem;
}
```

---

## 13. Public API

Phải export component qua:

```txt
projects/ui/src/public-api.ts
```

Ví dụ:

```ts
export * from './lib/components/button/button';
```

Nếu file theo convention Angular mặc định:

```ts
export * from './lib/components/button/button.component';
```

Giữ đúng convention đang có của project. Không đổi tên file hàng loạt nếu project đã có pattern.

---

## 14. File cần tạo/sửa

Tùy cấu trúc đang có, ưu tiên ít file nhất.

Khuyến nghị:

```txt
projects/ui/src/lib/components/button/button.ts
projects/ui/src/lib/components/button/button.html
projects/ui/src/lib/components/button/button.scss
projects/ui/src/public-api.ts
projects/demo/src/app/...
```

Nếu project đang dùng `.component.ts` thì dùng:

```txt
projects/ui/src/lib/components/button/button.component.ts
projects/ui/src/lib/components/button/button.component.html
projects/ui/src/lib/components/button/button.component.scss
```

Không tạo folder rỗng.
Không tạo service.
Không tạo directive.
Không tạo token.
Không tạo module.

---

## 15. Hành vi cần đúng

### Click

- Click bình thường emit `clicked`.
- Khi `disabled=true`, không emit.
- Khi `loading=true`, không emit.

### Loading

- Hiển thị spinner.
- Button bị disabled.
- Set `aria-busy="true"`.
- Không cần tạo `loadingIcon` input ở bản đầu.

### Icon

- Icon trái mặc định.
- Icon phải khi `iconPosition="right"`.
- Icon-only dùng square button.
- Icon-only phải có `ariaLabel` ở usage.

### Fluid

- `fluid=true` làm button full width.
- Host cũng nên full width để layout đúng.

### Type

- Default `type="button"`.
- Cho phép `submit`, `reset`.

---

## 16. Không làm những thứ này khi code

Không được:

- Import PrimeNG.
- Import Angular Material.
- Import thư viện icon ngoài.
- Tạo `ButtonModule`.
- Tạo `ButtonService`.
- Tạo global config token.
- Tạo pass-through API.
- Tạo directive `tButton` nếu chưa được yêu cầu.
- Tạo badge trong button ở version đầu.
- Tạo quá nhiều variant chưa dùng.
- Tự viết keyboard handling thừa cho native button.
- Dùng `any` nếu không bắt buộc.
- Dùng inline style hardcode trong template.
- Đổi cấu trúc lớn của project.

---

## 17. Checklist hoàn thành

Trước khi trả code, kiểm tra:

- [ ] `TButton` là standalone component.
- [ ] Selector là `t-button`.
- [ ] Dùng Angular v21 signal-style `input()` / `output()` nếu project đang theo hướng này.
- [ ] Dùng native `<button>`.
- [ ] Default `type` là `button`.
- [ ] Có `variant`, `size`, `disabled`, `loading`, `fluid`, `rounded`, `raised`, `icon`, `iconPosition`, `iconOnly`, `ariaLabel`.
- [ ] Loading disable click.
- [ ] Disabled disable click.
- [ ] Style dùng CSS Variables.
- [ ] Không thêm dependency mới.
- [ ] Export trong `public-api.ts`.
- [ ] Demo app có ví dụ tối thiểu.
- [ ] `ng build ui` pass.

---

## 18. Prompt gợi ý cho AI code

Dùng prompt này khi yêu cầu AI khác code:

```md
Hãy tạo component `TButton` cho Angular v21 UI Library theo skill dưới đây.

Yêu cầu bắt buộc:
- Standalone component.
- Selector `t-button`.
- Class `TButton`.
- TypeScript strict.
- SCSS.
- CSS Variables.
- Không dùng PrimeNG, Angular Material, Bootstrap hoặc UI dependency ngoài.
- Không tạo module/service/directive/token/helper nếu chưa cần.
- Ưu tiên code tối giản, dễ đọc, ít thay đổi nhất.
- Nếu project đã có convention file name thì giữ convention đó.
- Export component qua `public-api.ts`.
- Thêm demo tối thiểu trong demo app nếu project có demo.

API cần có:
- type: 'button' | 'submit' | 'reset', default 'button'
- variant: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'ghost' | 'outline' | 'text' | 'link', default 'primary'
- size: 'sm' | 'md' | 'lg', default 'md'
- disabled: boolean, default false
- loading: boolean, default false
- fluid: boolean, default false
- rounded: boolean, default false
- raised: boolean, default false
- icon?: string
- iconPosition: 'left' | 'right', default 'left'
- iconOnly: boolean, default false
- ariaLabel?: string
- tabIndex?: number
- clicked = output<MouseEvent>()

Hành vi:
- Render native `<button>` bên trong.
- Khi disabled/loading thì button disabled và không emit clicked.
- Khi loading hiển thị spinner CSS và set aria-busy.
- Icon/spinner aria-hidden.
- Icon-only usage phải truyền ariaLabel.
- Không tự xử lý keyboard event vì native button đã làm.

Sau khi code xong, kiểm tra build `ng build ui`.
```

---

## 19. Nguyên tắc cuối cùng

Khi phân vân, chọn hướng:

> Ít code nhất có thể, đúng nhu cầu nhất có thể, dễ mở rộng khi thật sự cần.

Không vẽ vời kiến trúc. Không tạo thứ chưa dùng. Không thêm complexity chỉ vì “sau này có thể cần”.
