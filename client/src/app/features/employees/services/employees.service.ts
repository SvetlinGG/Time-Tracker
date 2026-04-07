import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class EmployeesService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/apiemployees'
}
