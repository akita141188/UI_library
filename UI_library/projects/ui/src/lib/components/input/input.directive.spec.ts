import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TInputDirective } from './input.directive';
import type { TInputState } from './input.types';

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput placeholder="Name" />`,
})
class TInputDefaultHost {}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput tSize="sm" />`,
})
class TInputSmallHost {}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput tSize="md" />`,
})
class TInputMediumHost {}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput tSize="lg" />`,
})
class TInputLargeHost {}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput size="sm" />`,
})
class TInputNativeSizeHost {}

@Component({
  selector: 't-input-state-host',
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput [tState]="visualState()" />`,
})
class TInputStateHost {
  readonly visualState = signal<TInputState>('error');
}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput tFluid />`,
})
class TInputBareFluidHost {}

@Component({
  selector: 't-input-bound-fluid-true-host',
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput [tFluid]="fluid" />`,
})
class TInputBoundFluidTrueHost {
  fluid = true;
}

@Component({
  selector: 't-input-bound-fluid-false-host',
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput [tFluid]="fluid" />`,
})
class TInputBoundFluidFalseHost {
  fluid = false;
}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `<input tInput tFluid="false" />`,
})
class TInputStringFalseFluidHost {}

@Component({
  standalone: true,
  imports: [TInputDirective],
  template: `
    <input
      tInput
      type="email"
      name="email"
      autocomplete="email"
      placeholder="Email"
      disabled
      readonly
    />
  `,
})
class TInputNativeAttrsHost {}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TInputDirective],
  template: `<input tInput [formControl]="control" />`,
})
class TInputFormControlHost {
  control = new FormControl('', { nonNullable: true });
}

describe('TInputDirective', () => {
  function getInput<T>(fixture: ComponentFixture<T>): HTMLInputElement {
    return fixture.nativeElement.querySelector('input') as HTMLInputElement;
  }

  it('should create and add the base class', async () => {
    await TestBed.configureTestingModule({ imports: [TInputDefaultHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputDefaultHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input).toBeTruthy();
    expect(input.classList.contains('t-input')).toBe(true);
  });

  it('should use md as the default size', async () => {
    await TestBed.configureTestingModule({ imports: [TInputDefaultHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputDefaultHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.classList.contains('t-input--md')).toBe(true);
  });

  it('should apply sm, md, and lg classes through tSize', async () => {
    await TestBed.configureTestingModule({
      imports: [TInputSmallHost, TInputMediumHost, TInputLargeHost],
    }).compileComponents();

    const smallFixture = TestBed.createComponent(TInputSmallHost);
    smallFixture.detectChanges();
    expect(getInput(smallFixture).classList.contains('t-input--sm')).toBe(true);

    const mediumFixture = TestBed.createComponent(TInputMediumHost);
    mediumFixture.detectChanges();
    expect(getInput(mediumFixture).classList.contains('t-input--md')).toBe(true);

    const largeFixture = TestBed.createComponent(TInputLargeHost);
    largeFixture.detectChanges();
    expect(getInput(largeFixture).classList.contains('t-input--lg')).toBe(true);
  });

  it('should not use native size for visual size', async () => {
    await TestBed.configureTestingModule({ imports: [TInputNativeSizeHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputNativeSizeHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.getAttribute('size')).toBe('sm');
    expect(input.classList.contains('t-input--sm')).toBe(false);
    expect(input.classList.contains('t-input--md')).toBe(true);
  });

  it('should apply error class through tState', async () => {
    await TestBed.configureTestingModule({ imports: [TInputStateHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputStateHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.classList.contains('t-input--error')).toBe(true);
  });

  it('should remove error class when tState returns to default', async () => {
    await TestBed.configureTestingModule({ imports: [TInputStateHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputStateHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.classList.contains('t-input--error')).toBe(true);

    fixture.componentInstance.visualState.set('default');
    fixture.detectChanges();
    expect(input.classList.contains('t-input--error')).toBe(false);
  });

  it('should apply fluid class through bare tFluid', async () => {
    await TestBed.configureTestingModule({ imports: [TInputBareFluidHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputBareFluidHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.classList.contains('t-input--fluid')).toBe(true);
  });

  it('should apply fluid class through bound true and remove it for false', async () => {
    await TestBed.configureTestingModule({
      imports: [TInputBoundFluidTrueHost, TInputBoundFluidFalseHost],
    }).compileComponents();

    const trueFixture = TestBed.createComponent(TInputBoundFluidTrueHost);
    trueFixture.detectChanges();
    expect(getInput(trueFixture).classList.contains('t-input--fluid')).toBe(true);

    const falseFixture = TestBed.createComponent(TInputBoundFluidFalseHost);
    falseFixture.detectChanges();
    expect(getInput(falseFixture).classList.contains('t-input--fluid')).toBe(false);
  });

  it('should not apply fluid class through string false tFluid', async () => {
    await TestBed.configureTestingModule({
      imports: [TInputStringFalseFluidHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(TInputStringFalseFluidHost);
    fixture.detectChanges();

    expect(getInput(fixture).classList.contains('t-input--fluid')).toBe(false);
  });

  it('should keep native placeholder, disabled, readonly, type, name, and autocomplete behavior', async () => {
    await TestBed.configureTestingModule({ imports: [TInputNativeAttrsHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputNativeAttrsHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    expect(input.placeholder).toBe('Email');
    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(input.type).toBe('email');
    expect(input.name).toBe('email');
    expect(input.autocomplete).toBe('email');
  });

  it('should work with reactive forms', async () => {
    await TestBed.configureTestingModule({ imports: [TInputFormControlHost] }).compileComponents();

    const fixture = TestBed.createComponent(TInputFormControlHost);
    fixture.detectChanges();

    const input = getInput(fixture);

    fixture.componentInstance.control.setValue('abc');
    fixture.detectChanges();
    expect(input.value).toBe('abc');

    input.value = 'xyz';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('xyz');
  });
});
