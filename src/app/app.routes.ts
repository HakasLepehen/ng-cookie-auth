import { Routes } from '@angular/router';
import {authGuard} from './auth-guard';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => Home,
    canMatch: [authGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => Login,
  },
];
