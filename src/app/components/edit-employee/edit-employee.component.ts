import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../employee.model';

@Component({
	selector: 'app-edit-employee',
	standalone: true,
	imports: [ReactiveFormsModule,CommonModule],
	templateUrl: './edit-employee.component.html',
	styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
	employeeForm:FormGroup;
	employeeId?:any;
	selectedFile?:File;

	constructor(
		private fmBuilder:FormBuilder,
		private empService:EmployeeService,
		private route:ActivatedRoute,
		private router:Router
	){
		this.employeeForm = this.fmBuilder.group({
			name:['',Validators.required],
			email: ['',[Validators.required,Validators.email]],
			position:['',[Validators.required]],
			profilePicture:['']
		})
	}

	ngOnInit():void{
		this.employeeId = this.route.snapshot.paramMap.get('id');
		this.empService.getEmployee(this.employeeId).subscribe((data)=>{
			this.employeeForm?.patchValue(data)
		})
	}

	updateEmployee(){
			if(this.employeeForm.valid && this.employeeId){
				const updatedEmployee:Employee = {
					...this.employeeForm.value
				};
				if(this.selectedFile){
					const reader = new FileReader();
					reader.onload = () =>{
						updatedEmployee.profilePicture = reader.result as string;
						this.saveEmployee(updatedEmployee);
					};
					reader.readAsDataURL(this.selectedFile);
				}
				else{
					this.saveEmployee(updatedEmployee);
				}
		}
	}

	saveEmployee(employee:Employee){
		if(this.employeeId){
			this.empService.updateEmployee(this.employeeId,employee).subscribe(()=>{
				this.router.navigate(['/employees'])
			})
		}
	}

	onSelectedFile(event:any):void{
		this.selectedFile = event.target.files[0]
	}

}
