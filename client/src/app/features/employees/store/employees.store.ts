import { inject, Injectable, signal } from "@angular/core";
import { EmployeesService } from "../services/employees.service";
import { Employee } from "../../../core/models/employee.model";



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
}