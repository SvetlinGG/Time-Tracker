import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', 
        loadComponent: () => 
            import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {path: '',
        loadComponent: () =>
            import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => 
                    import('./features/dashboard/pages/dashboard-home/dashboard-home.component').then(
                        m => m.DashboardHomeComponent)
            }
        ]
    }
];
