import { Component, OnInit, } from '@angular/core';
import { Employee } from '../../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-employee-details',
	standalone: true,
	imports: [CommonModule,RouterModule],
	templateUrl: './employee-details.component.html',
	styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit  {
	employee?:Employee;

	constructor(
		private route:ActivatedRoute,
		private empService:EmployeeService,
		private router:Router
	){}

	ngOnInit():void{
		const id = this.route.snapshot.paramMap.get('id');
		this.empService.getEmployee(String(id)).subscribe((data)=>{
			this.employee = data
		})
	}

	deleteEmployee(){
		if(this.employee && confirm('Are you sure to delete this Employee?')){
			console.log(typeof(this.employee.id));
			
			this.empService.deleteEmployee(this.employee.id).subscribe(()=>{
				this.router.navigate(['/employees']);
			})
		}
	}
}
