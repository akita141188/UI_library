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
