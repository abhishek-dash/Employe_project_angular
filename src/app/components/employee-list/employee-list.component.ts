import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Declare bootstrap to avoid the "cannot find name" error
declare var bootstrap: any;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
	employees:Employee[] = [];
	@ViewChild('noDataModal') noDataModal!: ElementRef;
	constructor(private empService:EmployeeService,
		private router:Router
	){}

	ngOnInit():void{
		this.fetchEmployees();
	}
	fetchEmployees(){
		this.empService.getEmployees().subscribe(data=>{
			this.employees = data;
			
			if(this.employees.length === 0){
				this.openModal()
			}
		})
	}

	openModal(){
		const modalElement = this.noDataModal.nativeElement;
		const modal = new bootstrap.Modal(modalElement);
		modal.show()
	}

	deleteEmployee(id?:number){
		if(id && confirm('You want to delete this employee')){
			this.empService.deleteEmployee(id).subscribe(()=>{
				this.fetchEmployees();
			})
		}
	}

}
