// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },

  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate: [authGuard],    
    children: [
      { path: '', redirectTo: 'viewplants', pathMatch: 'full' },
      { path: 'viewplants', loadComponent: () => import('./dashboard/viewplant/viewplant.component').then(m => m.ViewplantComponent), canActivate: [authGuard] },
      { path: 'addplant', loadComponent: () => import('./dashboard/addplant/addplant.component').then(m => m.AddplantComponent), canActivate: [authGuard] },
      { path: 'updateplant/:id', loadComponent: () => import('./dashboard/updateplant/updateplant.component').then(m => m.UpdateplantComponent), canActivate: [authGuard] },
      { path: 'remainders', loadComponent: () => import('./dashboard/remainders/remainders.component').then(m => m.RemaindersComponent), canActivate: [authGuard] },
    ]
  }
];
