import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-demo/button-demo.component').then((m) => m.ButtonDemoComponent),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./pages/input-demo/input-demo.component').then((m) => m.InputDemoComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'button',
  },
];
