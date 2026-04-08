import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeesStore } from '../../store/employees.store';
import { Employee } from '../../../../core/models/employee.model';


@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  private store = inject(EmployeesStore);
  private router = inject(Router);

  readonly searchTerm = signal('');
  readonly employees = this.store.employees;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly filteredEmployees = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if(!term){
      return this.employees();
    }
    return this.employees().filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

      return(
        fullName.includes(term) ||
        employee.personalNumber.toLowerCase().includes
      )
    })

  });

    
  
  ngOnInit(): void {
    this.store.loadEmployees();
  }

  onSearch(value: string): void{
    this.searchTerm.set(value);
  }

  onEdit(employee: Employee): void{
    this.router.navigate((['./employees', employee._id, 'edit']));
  }

  onDelete(employee: Employee): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );
    if (!confirmed){
      return;
    }
    this.store.deleteEmployee(employee._id);
  }
  trackByEmployeeId(_: number, employee: Employee): string{
     return employee._id;
  }
}
