import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeesStore } from '../../store/employees.store';
import { ContractType, CreateEmployeeDto } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employees-form.component.html',
  styleUrl: './employees-form.component.css'
})
export class EmployeesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(EmployeesStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private employeeId = signal<string | null>(null);


  readonly contractTypes: ContractType[] = ['hourly', 'monthly', 'shift'];
  readonly submitting = this.store.submitting;
  readonly error = this.store.error;
  readonly isEditMode = computed(() => this.employeeId() !== null);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    personalNumber: ['', [Validators.required, Validators.minLength(3)]],
    position: ['', [Validators.required]],
    department: [''],
    hourlyRate: [0, [Validators.required, Validators.min(0)]],
    contractType: ['hourly' as ContractType, [Validators.required]],
    standardDailyHours: [8, [Validators.required, Validators.min(1)]],
    isActive: [true],
    hireDate: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      return;
    }

    this.employeeId.set(id);

    this.store.loadEmployeeById(id, employee => {
      this.form.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        personalNumber: employee.personalNumber,
        position: employee.position,
        department: employee.department ?? '',
        hourlyRate: employee.hourlyRate,
        contractType: employee.contractType,
        standardDailyHours: employee.standardDailyHours,
        isActive: employee.isActive,
        hireDate: employee.hireDate.slice(0, 10),
      });
    });
  }

  onSubmit(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload: CreateEmployeeDto = {
      firstName: this.form.controls.firstName.getRawValue().trim(),
      lastName: this.form.controls.lastName.getRawValue().trim(),
      personalNumber: this.form.controls.personalNumber.getRawValue().trim(),
      position: this.form.controls.position.getRawValue().trim(),
      department: this.form.controls.department.getRawValue().trim(),
      hourlyRate: Number(this.form.controls.hourlyRate.getRawValue()),
      contractType: this.form.controls.contractType.getRawValue(),
      standardDailyHours: Number(
        this.form.controls.standardDailyHours.getRawValue()
      ),
      isActive: this.form.controls.isActive.getRawValue(),
      hireDate: this.form.controls.hireDate.getRawValue(),
    };

    const id = this.employeeId();

    if(id){
      this.store.updateEmployee(id, payload, () => {
        this.router.navigate(['/employees'])
      });
      return;
    }
    this.store.createEmployee(payload, () => {
      this.router.navigate(['/employees']);
    });
  }

  hasError(controlName: keyof typeof this.form.controls): boolean{
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
  
}
