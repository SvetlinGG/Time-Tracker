import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeesStore } from '../../store/employees.store';
import { ContractType } from '../../../../core/models/employee.model';

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

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', Validators.required, Validators.minLength(2)],
    personalNumber: ['', Validators.required, Validators.minLength(3)],
    
  })
  
}
