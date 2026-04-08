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
            },
            {
                path: 'employees',
                loadComponent: () => 
                    import('./features/employees/pages/employees-list/employees-list.component').then(
                        m => m.EmployeesListComponent)
            },
            {
                path: 'employees/new',
                loadComponent: () => 
                    import('./features/employees/pages/employees-form/employees-form.component').then(
                        m => m.EmployeesFormComponent)
            },
            {
                path: 'employees/:id/edit',
                loadComponent: () =>
                    import('./features/employees/pages/employees-form/employees-form.component').then(
                        m => m.EmployeesFormComponent
                    ),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'time-tracking',
                loadComponent: () =>
                    import('./features/time-tracking/pages/time-entry-list/time-entry-list.component').then(
                        m => m.TimeEntryListComponent)
            },
            {
                path: 'payroll',
                loadComponent: () =>
                    import('./features/payroll/pages/payroll-list/payroll-list.component').then(
                        m => m.PayrollListComponent)
            },
            {
                path: 'reports',
                loadComponent: () =>
                    import('./features/reports/pages/reports-home/reports-home.component').then(
                        m => m.ReportsHomeComponent)
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./features/settings/pages/settings-home/settings-home.component').then(
                        m => m.SettingsHomeComponent)
            }
        ]
    },
    {path: '**', redirectTo: 'login'}
];
