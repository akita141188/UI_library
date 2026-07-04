# UI Library Rules - Angular v21

Bộ rule này áp dụng riêng cho dự án UI Component Library dùng Angular v21, kế thừa rule chung của TRỤC.

## 1. Mục tiêu dự án

Dự án này dùng để xây dựng một thư viện UI riêng, tương tự PrimeNG về cách sử dụng, nhưng không phụ thuộc PrimeNG.

Mục tiêu chính:

- Tạo thư viện UI dùng lại được cho nhiều dự án Angular.
- Component đẹp, hiện đại, dễ dùng, dễ mở rộng.
- API đơn giản, rõ ràng, không rườm rà.
- Ưu tiên code tối giản, dễ đọc, dễ bảo trì.
- Không copy PrimeNG, chỉ học cách tổ chức và trải nghiệm sử dụng.
- Không thêm abstraction, helper, token, service, utility nếu chưa thật sự cần.

## 2. Công nghệ mặc định

- Angular v21.
- TypeScript strict mode.
- Standalone components.
- SCSS.
- CSS Variables cho theme.
- Ưu tiên dùng những gì Angular cung cấp sẵn.
- Ưu tiên Angular CDK cho các nền tảng như overlay, portal, a11y, drag-drop, layout nếu cần.
- Không dùng PrimeNG.
- Không dùng dependency UI nặng khác.
- Không dùng thư viện ngoài nếu Angular hoặc Angular CDK đã đáp ứng được.

## 3. Nguyên tắc code chung

Luôn ưu tiên:

- Code ngắn gọn.
- Dễ hiểu hơn là quá thông minh.
- Tận dụng code và pattern đang có.
- Chỉ viết mới khi thật sự cần thiết.
- Không tạo function/helper/key/constant/service thừa.
- Không tách file quá sớm nếu logic còn đơn giản.
- Không over-engineer.
- Không tạo kiến trúc phức tạp khi chưa có nhu cầu thực tế.

Khi sửa hoặc thêm component:

- Làm thay đổi nhỏ nhất để đạt yêu cầu.
- Giữ style và convention đang có.
- Không đổi cấu trúc lớn nếu không cần.
- Không tự ý thêm dependency.
- Không đổi public API cũ nếu có thể tránh.

## 4. Cấu trúc thư mục chuẩn

Cấu trúc khuyến nghị:

```txt
projects/
  ui/
    src/
      lib/
        components/
          button/
          input/
          card/
        directives/
        services/
        styles/
          _variables.scss
          _mixins.scss
          theme.scss
      public-api.ts
  demo/
    src/
      app/
```

Chỉ tạo thư mục mới khi có nhu cầu thật.

Ví dụ:

- `components/` chỉ chứa component UI.
- `directives/` chỉ tạo khi có directive thật sự dùng lại.
- `services/` chỉ tạo khi có service thật sự cần chia sẻ.
- `styles/` chứa theme, variables, mixins dùng chung.

Không tạo sẵn nhiều folder rỗng nếu chưa dùng.

## 5. Quy tắc đặt tên

Component class:

```ts
TButton
TInput
TCard
```

Selector bắt buộc dùng prefix `t-`:

```html
<t-button />
<t-input />
<t-card />
```

Không dùng prefix `ui-` cho selector public.

File name:

```txt
button.ts
button.html
button.scss
```

Hoặc nếu project đang theo convention Angular mặc định:

```txt
button.component.ts
button.component.html
button.component.scss
```

Ưu tiên giữ thống nhất với cấu trúc đang có.

## 5.1. Quy tắc ưu tiên Angular / CDK

Khi xây component, luôn kiểm tra theo thứ tự:

1. Angular built-in có xử lý được không?
2. Angular CDK có primitive phù hợp không?
3. Tự viết phần nhỏ, tối giản nếu Angular/CDK chưa có sẵn.
4. Chỉ dùng thư viện ngoài khi Angular/CDK thật sự không đáp ứng được.

Ví dụ nên dùng Angular CDK cho:

- Overlay, dialog, popover, tooltip.
- Portal.
- Accessibility, focus trap, keyboard navigation.
- Drag-drop.
- Virtual scroll nếu cần.

Không tự viết lại các nền tảng phức tạp này nếu CDK đã có sẵn.

## 6. Quy tắc component

Mỗi component nên:

- Là standalone component.
- Có API đơn giản.
- Dùng `input()` / `output()` nếu project đang dùng Angular signal-style API.
- Hạn chế logic phức tạp trong component.
- Không tự xử lý quá nhiều case hiếm ngay từ đầu.
- Hỗ trợ accessibility cơ bản khi cần.
- Có style scoped theo component.
- Dùng CSS Variables thay vì hardcode màu tràn lan.

Không nên:

- Nhồi quá nhiều feature vào component ngay từ đầu.
- Tạo quá nhiều variant khi chưa dùng.
- Tạo service riêng cho component nếu chưa cần.
- Tạo token/config global nếu component chưa có nhu cầu thật.

## 7. Public API

Mọi component/directive/service muốn dùng bên ngoài phải export qua `public-api.ts`.

Ví dụ:

```ts
export * from './lib/components/button/button';
export * from './lib/components/input/input';
export * from './lib/components/card/card';
```

Không export internal file nếu không muốn người dùng library phụ thuộc vào nó.

Public API phải ổn định, tránh đổi tên tùy tiện.

## 8. Style và theme

Theme mặc định dùng CSS Variables.

Ví dụ biến nền tảng:

```scss
:root {
  --t-primary: #2563eb;
  --t-surface: #ffffff;
  --t-text: #111827;
  --t-muted-text: #6b7280;
  --t-border: #e5e7eb;
  --t-radius: 0.75rem;
  --t-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  --t-transition: 150ms ease;
}
```

Quy tắc style:

- Không hardcode màu nếu có thể dùng variable.
- Không lạm dụng mixin.
- Không tạo design token phức tạp khi chưa cần.
- Ưu tiên style hiện đại, sạch, dễ override.
- Component phải hoạt động ổn với theme mặc định.

## 9. Demo app

Demo app chỉ dùng để test và xem component.

Demo nên:

- Import trực tiếp component từ library.
- Hiển thị các trạng thái cơ bản.
- Có layout đơn giản, dễ nhìn.
- Không chứa logic nghiệp vụ.
- Không biến demo thành app phức tạp.

## 10. Dependency

Không thêm dependency mới nếu chưa có lý do rõ ràng.

Được ưu tiên dùng:

- Angular built-in API trước.
- Angular CDK cho overlay, portal, a11y, drag-drop, focus management, layout nếu phù hợp.

Không dùng:

- PrimeNG.
- Bootstrap, Material UI, Ant Design hoặc thư viện UI khác làm nền.
- Dependency ngoài chỉ để làm việc Angular/CDK đã có thể làm tốt.

Nếu bắt buộc thêm dependency ngoài, phải giải thích:

- Nó giải quyết vấn đề gì.
- Vì sao không tự làm đơn giản hơn.
- Có ảnh hưởng bundle size không.

## 11. Build và publish

Library phải build được bằng Angular CLI.

Lệnh cơ bản:

```bash
ng build ui
```

Output mặc định:

```txt
dist/ui
```

Trước khi publish:

- Kiểm tra build thành công.
- Kiểm tra public API.
- Kiểm tra package metadata.
- Không publish file demo app.
- Không export file nội bộ không cần thiết.

## 12. Checklist khi thêm component mới

Trước khi thêm component mới, cần kiểm tra:

- Component này có thật sự cần trong library không?
- Có component cũ nào tận dụng được không?
- API có đủ đơn giản chưa?
- Style có dùng CSS Variables chưa?
- Có export trong `public-api.ts` chưa?
- Demo app đã có ví dụ tối thiểu chưa?
- Build library có pass không?

## 13. Phong cách mong muốn

Thư viện này hướng tới UI:

- Hiện đại.
- Gọn.
- Cao cấp hơn PrimeNG về cảm giác giao diện.
- Dễ tùy biến theme.
- Dễ dùng trong form, dashboard, admin, portal.
- Không rườm rà.

Ưu tiên trải nghiệm developer:

```html
<t-button variant="primary" size="md">
  Lưu thay đổi
</t-button>
```

Thay vì API quá dài hoặc quá nhiều config.

## 14. Rule quan trọng nhất

Luôn làm theo nguyên tắc:

> Ít code nhất có thể, đúng nhu cầu nhất có thể, dễ mở rộng khi thật sự cần.

Không vẽ vời kiến trúc. Không tạo thứ chưa dùng. Không thêm complexity chỉ vì “sau này có thể cần”.
