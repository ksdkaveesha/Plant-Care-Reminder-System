import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewplantComponent } from './dashboard/viewplant/viewplant.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => LoginComponent },
    { path: 'register', loadComponent: () => RegisterComponent },
    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // { path: '', component: DashboardComponent },
      { path: 'viewplants', component: ViewplantComponent },
    //   { path: 'addplant', component: AddPlantComponent }
    ]
  },
];
