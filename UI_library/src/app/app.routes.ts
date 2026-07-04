import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-demo/button-demo.component').then((m) => m.ButtonDemoComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'button',
  },
];
