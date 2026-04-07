import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployeeDto, Employee } from '../../../core/models/employee.model';

@Injectable({providedIn: 'root'})
export class EmployeesService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/apiemployees';

  getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl)
  }

  getById(id: string): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseUrl}/${id}`)
  }

  create(payload: CreateEmployeeDto): Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl, payload)
  }

  update(id: string, payload: CreateEmployeeDto): Observable<Employee>{
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, payload)
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}
