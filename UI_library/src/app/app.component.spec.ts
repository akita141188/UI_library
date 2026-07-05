import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render demo shell navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.demo-sidebar')).toBeTruthy();
    expect(compiled.querySelector('.demo-brand')?.textContent).toContain('TRỤC UI');
    expect(compiled.querySelector('.demo-nav__link')?.textContent).toContain('Button');
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
