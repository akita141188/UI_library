# UI Library Rules - Angular v21

Rule chuẩn cho dự án UI Component Library dùng Angular v21. File này là nền tảng chung cho tất cả component sau này.

Mục tiêu: xây một UI library riêng có API dễ dùng, giao diện hiện đại, accessibility tốt, dễ theme bằng CSS Variables, nhưng code tối giản và không over-engineer.

---

## 1. Triết lý sản phẩm

Thư viện này dùng để xây component UI dùng lại cho nhiều dự án Angular.

Ưu tiên:

- Đẹp, hiện đại, cao cấp, gọn.
- API ngắn, rõ, dễ nhớ.
- Dễ dùng trong form, dashboard, admin, portal.
- Dễ override theme bằng CSS Variables.
- Component ổn định, ít breaking change.
- Tận dụng Angular built-in và Angular CDK trước.
- Code ít nhất có thể nhưng vẫn đủ production-ready.

Không làm:

- Không biến component thành “siêu component” ôm mọi case.
- Không thêm feature chỉ vì thư viện khác có.
- Không tạo architecture phức tạp khi chưa có nhu cầu thật.
- Không tạo token/helper/service/utility thừa.
- Không copy PrimeNG, shadcn/ui, Angular Material; chỉ học cách tổ chức tốt của họ.

Rule quan trọng nhất:

> Ít code nhất có thể, đúng nhu cầu nhất có thể, dễ mở rộng khi thật sự cần.

---

## 2. Công nghệ mặc định

Bắt buộc:

- Angular v21.
- TypeScript strict mode.
- Standalone components/directives.
- Signal-style API: `input()`, `output()`, `computed()`, `contentChild()` khi phù hợp.
- `ChangeDetectionStrategy.OnPush`.
- SCSS.
- CSS Variables cho theme.
- Native HTML element đúng semantic trước tiên.

Không dùng:

- PrimeNG.
- Angular Material làm UI nền.
- Bootstrap, Ant Design, MUI hoặc UI dependency nặng khác.
- Dependency ngoài nếu Angular/CDK đã xử lý được.

Thứ tự quyết định khi cần behavior phức tạp:

1. Angular built-in xử lý được không?
2. Angular CDK có primitive phù hợp không?
3. Tự viết phần nhỏ, tối giản.
4. Chỉ dùng thư viện ngoài khi thật sự bắt buộc và phải giải thích lý do.

---

## 3. Nguyên tắc code

Luôn ưu tiên:

- Code ngắn gọn.
- Dễ hiểu hơn là quá thông minh.
- Tận dụng code và pattern đang có.
- Thay đổi nhỏ nhất để đạt yêu cầu.
- Không đổi public API cũ nếu tránh được.
- Không tự ý thêm dependency.
- Không tách file quá sớm nếu logic còn đơn giản.

Không làm:

- Không tạo function/helper/key/constant/service thừa.
- Không tạo abstraction “để sau này dùng”.
- Không nhồi nhiều feature hiếm vào component ban đầu.
- Không tạo folder rỗng cho đẹp cấu trúc.
- Không tạo passthrough API kiểu `style`, `styleClass`, `pt`, `dt`, `unstyled` nếu chưa thật sự cần.

---

## 4. Quy tắc đặt tên file

Dự án bắt buộc dùng suffix Angular rõ nghĩa.

Component:

```txt
button.component.ts
button.component.html
button.component.scss
button.component.spec.ts
```

Directive:

```txt
button-icon.directive.ts
auto-focus.directive.ts
```

Service:

```txt
theme.service.ts
```

Pipe:

```txt
safe-html.pipe.ts
```

Util:

```txt
coerce-boolean.util.ts
```

Types/model:

```txt
button.types.ts
button.model.ts
```

Không dùng:

```txt
button.ts
button.html
utils.ts
helpers.ts
constants.ts
```

trừ khi có lý do thật sự rõ.

---

## 5. Class, selector, CSS naming

Component class dùng prefix `T`:

```ts
export class TButton {}
export class TInput {}
export class TCard {}
```

Selector public dùng prefix `t-`:

```html
<t-button />
<t-input />
<t-card />
```

Không dùng prefix `ui-`.

CSS class nội bộ dùng prefix `t-` và BEM nhẹ:

```scss
.t-button {}
.t-button__icon {}
.t-button__label {}
.t-button--primary {}
.t-button--loading {}
```

Không dùng class mơ hồ hoặc lệch convention:

```scss
.button {}
.ui-button {}
.t-button-primary {}
```

---

## 6. Cấu trúc thư mục library

Cấu trúc khuyến nghị:

```txt
projects/
  ui/
    src/
      lib/
        components/
          button/
            button.component.ts
            button.component.html
            button.component.scss
            button.component.spec.ts
            button.types.ts
            button-icon.directive.ts
        directives/
        services/
        styles/
          theme.scss
      public-api.ts
```

Chỉ tạo folder/file khi có nhu cầu thật. Không tạo folder rỗng cho đẹp.

---

## 7. Public API

Mọi component/directive/service muốn dùng bên ngoài phải export qua `public-api.ts`.

Ví dụ:

```ts
export * from './lib/components/button/button.component';
export * from './lib/components/button/button-icon.directive';
export * from './lib/components/button/button.types';
```

Không export:

- Demo component.
- File internal.
- Helper chưa muốn public.
- Experimental API.

Public API phải ổn định, tránh đổi tên tùy tiện.

---

## 8. API design

API phải ngắn, rõ, dễ đoán.

Ví dụ tốt:

```html
<t-button variant="primary" size="md" loading>
  Lưu thay đổi
</t-button>
```

Input nên dùng tên ngắn:

- `variant`
- `size`
- `type`
- `disabled`
- `loading`
- `fluid`
- `rounded`
- `raised`
- `icon`
- `iconSrc`
- `iconPosition`
- `iconOnly`
- `ariaLabel`

Output dùng tên hành động rõ:

- `clicked`
- `closed`
- `selected`
- `changed`

Không thêm alias/API phụ nếu chưa cần.

---

## 9. Accessibility

Accessibility là bắt buộc.

Rule chung:

- Dùng native element đúng semantic trước tiên.
- Button phải render native `<button>` nếu là action.
- Link/navigation phải dùng `<a>` hoặc component/link riêng, không nhét router behavior vào button.
- Icon-only button bắt buộc có accessible name qua `aria-label` hoặc input compatibility như `ariaLabel`.
- Disabled state phải dùng native `disabled` nếu là button.
- Loading state nên có `aria-busy` khi phù hợp.
- Icon/spinner decorative dùng `aria-hidden="true"`.
- Focus state phải nhìn rõ bằng keyboard.
- Không remove outline nếu không thay bằng focus ring tốt hơn.
- Không đặt `<ng-content>` bên trong `@if`, `@else`, `@for`, `@switch`; nếu cần ẩn, ẩn wrapper bằng `[hidden]` hoặc class.

Dùng Angular CDK a11y khi cần:

- FocusTrap.
- FocusMonitor.
- LiveAnnouncer.
- InteractivityChecker.
- ListKeyManager.

Không kéo CDK vào component nếu native HTML đã đủ.

---

## 10. Style và theme

Theme mặc định dùng CSS Variables.

Biến nền tảng nên có:

```scss
:root {
  --t-primary: #2563eb;
  --t-primary-hover: #1d4ed8;
  --t-primary-contrast: #ffffff;
  --t-primary-ring: rgba(37, 99, 235, 0.35);

  --t-secondary: #64748b;
  --t-secondary-hover: #475569;
  --t-secondary-ring: rgba(100, 116, 139, 0.35);

  --t-success: #16a34a;
  --t-success-hover: #15803d;
  --t-success-ring: rgba(22, 163, 74, 0.35);

  --t-info: #0284c7;
  --t-info-hover: #0369a1;
  --t-info-ring: rgba(2, 132, 199, 0.35);

  --t-warning: #d97706;
  --t-warning-hover: #b45309;
  --t-warning-ring: rgba(217, 119, 6, 0.35);

  --t-danger: #dc2626;
  --t-danger-hover: #b91c1c;
  --t-danger-ring: rgba(220, 38, 38, 0.35);

  --t-surface: #ffffff;
  --t-muted-surface: #f8fafc;
  --t-text: #111827;
  --t-muted-text: #6b7280;
  --t-border: #d1d5db;
  --t-border-strong: #cbd5e1;
  --t-radius: 0.75rem;
  --t-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  --t-transition: 150ms ease;
}
```

Rule style:

- Không hardcode màu nếu có thể dùng variable.
- Component token dùng prefix theo component, ví dụ `--t-button-bg`.
- Focus ring dùng biến riêng của component, ví dụ `--t-button-ring`.
- Có hover/active/focus/disabled/loading rõ.
- Có `box-sizing: border-box` cho component chính.
- Có `min-width: 0` cho label trong flex nếu text có thể dài.
- Có `prefers-reduced-motion` nếu dùng transition/animation.
- Không lạm dụng mixin hoặc design token quá sâu khi chưa cần.

---

## 11. Demo app

Demo app không được nhét demo trực tiếp vào `app.component`.

Mỗi component có demo page riêng và route riêng.

Ví dụ:

```txt
projects/
  demo/
    src/
      app/
        app.component.ts
        app.component.html
        app.routes.ts
        pages/
          button-demo/
            button-demo.component.ts
            button-demo.component.html
            button-demo.component.scss
```

`app.component` chỉ làm shell:

```html
<nav class="demo-nav">
  <a routerLink="/button">Button</a>
</nav>

<main class="demo-main">
  <router-outlet />
</main>
```

Route:

```ts
export const routes: Routes = [
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-demo/button-demo.component').then((m) => m.ButtonDemoComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'button' },
];
```

Không viết toàn bộ demo vào `app.component`.

---

## 12. Test

Mỗi component public nên có `.component.spec.ts`.

Test tối thiểu:

- Component tạo được.
- Default value quan trọng.
- Native semantic đúng.
- Disabled/loading behavior.
- Output emit đúng.
- Không emit khi disabled/loading nếu có.
- Accessibility chính.
- Projected content nếu component dùng content projection.
- Variant/size class nếu là public API.
- Edge case đã từng fix để tránh regression.

Không viết test quá rườm rà cho logic đơn giản, nhưng các behavior public phải có coverage.

---

## 13. Checklist khi thêm component mới

Trước khi coi component là xong:

- [ ] File name đúng suffix.
- [ ] Component standalone.
- [ ] Selector dùng `t-`.
- [ ] Class dùng prefix `T`.
- [ ] `ChangeDetectionStrategy.OnPush`.
- [ ] API public ít nhưng đủ dùng.
- [ ] Dùng `input()` / `output()` nếu project theo signal-style.
- [ ] Không thêm dependency ngoài.
- [ ] Không thêm service/helper/token thừa.
- [ ] Accessibility cơ bản ổn.
- [ ] Style dùng CSS Variables.
- [ ] Focus-visible rõ.
- [ ] Disabled/loading rõ nếu có.
- [ ] Có spec test public behavior.
- [ ] Có demo page riêng.
- [ ] Có route demo riêng.
- [ ] Export public API đúng.
- [ ] `ng build ui` pass.
- [ ] Test pass.

---

## 14. Component spec file chuẩn

Khi viết file chuẩn cho từng component, dùng cấu trúc này:

```txt
# T<Component> Standard

## 1. Mục tiêu
## 2. File structure
## 3. Public API
## 4. Behavior
## 5. Accessibility
## 6. Template rules
## 7. Style rules
## 8. Demo requirements
## 9. Test requirements
## 10. Public API export
## 11. Không được làm
## 12. Acceptance checklist
## 13. Current reference implementation
```

Component sau có thể lấy `button.md` làm mẫu.
