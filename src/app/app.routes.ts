import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  },{
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/signup',
  }
];
