import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	private apiUrl = 'http://localhost:3000/employees';


  	constructor(private http:HttpClient) {}

	getEmployees():Observable<Employee[]>{
		return this.http.get<Employee[]>(this.apiUrl)
	}

	getEmployee(id:string):Observable<Employee>{
		return this.http.get<Employee>(`${this.apiUrl}/${id}`)
	}

	addEmployee(employee:Employee):Observable<Employee>{
		return this.http.post<Employee>(this.apiUrl,employee)
	}

	updateEmployee(id:number,employee:Employee):Observable<Employee>{
		return this.http.put<Employee>(`${this.apiUrl}/${id}`,employee)
	}

	deleteEmployee(id:any):Observable<any>{
		return this.http.delete(`${this.apiUrl}/${id}`)
	}
}
