// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'viewplants', pathMatch: 'full' },
      { path: 'viewplants', loadComponent: () => import('./dashboard/viewplant/viewplant.component').then(m => m.ViewplantComponent) },
      { path: 'addplant', loadComponent: () => import('./dashboard/addplant/addplant.component').then(m => m.AddplantComponent) },
      { path: 'updateplant/:id', loadComponent: () => import('./dashboard/updateplant/updateplant.component').then(m => m.UpdateplantComponent) }
    ]
  }
];
