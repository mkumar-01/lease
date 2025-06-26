import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/registration/registration').then(m => m.Registration)
    },
    {

        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/detail/detail').then(m => m.Detail),
        canActivate: [authGuard]
    },
    // {
    //     path: '*',
    //     loadComponent: () => import('./pages/page-not-found/page-not-found').then(m => m.PageNotFound),
    // },
    { path: '**', component: PageNotFound }

];
