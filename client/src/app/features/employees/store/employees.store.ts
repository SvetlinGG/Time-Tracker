import { computed, inject, Injectable, signal } from "@angular/core";
import { EmployeesService } from "../services/employees.service";
import { CreateEmployeeDto, Employee, UpdateEmployeeDto } from "../../../core/models/employee.model";
import { finalize } from "rxjs";



@Injectable({
    providedIn: 'root',
})

export class EmployeesStore {
    private employeesService = inject(EmployeesService);

    private readonly _employees = signal<Employee[]>([]);
    private readonly _loading = signal(false);
    private readonly _submitting = signal(false);
    private readonly _error = signal<string | null>(null);

    readonly employees = this._employees.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly submitting = this._submitting.asReadonly();
    readonly error = this._error.asReadonly();

    readonly activeEmployees = computed(() => 
    this._employees().filter(employee => employee.isActive)
    );

    readonly employeesCount = computed(() => this._employees().length);

    loadEmployees():void {
        this._loading.set(true);
        this._error.set(null);

        this.employeesService
            .getAll()
            .pipe(finalize(() => this._loading.set(false)))
            .subscribe({
                next: employees => this._employees.set(employees),
                error: () => this._error.set('Failed to load employees.'),
            });
    }

    loadEmployeeById(id: string, callback: (employee: Employee) => void): void{
        this._loading.set(true);
        this._error.set(null);

        this.employeesService
            .getById(id)
            .pipe(finalize(() => this._loading.set(false)))
            .subscribe({
                next: employee => callback(employee),
                error: () => this._error.set('Failed to load employee details.'),
            });
    }

    createEmployee(payload: CreateEmployeeDto, onSuccess?: () => void): void {
        this._submitting.set(true);
        this._error.set(null);

        this.employeesService
            .create(payload)
            .pipe(finalize(() => this._submitting.set(false)))
            .subscribe({
                next: employee => {
                    this._employees.update(list => [employee, ...list]);
                    onSuccess?.();
                },
                error: () => this._error.set('Failed to create employee.')
            });
    }

    updateEmployee(
        id: string,
        payload: UpdateEmployeeDto,
        onSuccess?: () => void
    ): void {
        this._submitting.set(true);
        this._error.set(null);

        this.employeesService
            .update(id, payload)
            .pipe(finalize(() => this._submitting.set(false)))
            .subscribe({
                next: updatedEmployee => {
                    this._employees.update(list =>
                        list.map(employee =>
                            employee._id === id ? updatedEmployee : employee
                        )
                    );
                    onSuccess?.();
                },
                error: () => this._error.set('Failed to update employee.')
            });
    }

    


}