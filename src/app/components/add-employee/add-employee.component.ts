import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
	employeeForm : FormGroup;
	selectedFile?:File;

	constructor(
		private fb : FormBuilder,
		private empService:EmployeeService,
		private router:Router
	){
		this.employeeForm = this.fb.group({
			name:['',Validators.required],
			email:['',[Validators.required,Validators.email]],
			position:['',Validators.required]
		})
	}

	onFileSelected(event:any):void{
		this.selectedFile = event.target.files[0];
	}

	addEmployee():void{
		if(this.employeeForm.valid && this.selectedFile){
			// this.empService.addEmployee(this.employeeForm.value).subscribe(()=>{
			// 	this.router.navigate(['/employees']);
			// })
			const formData = new FormData();
			formData.append('name',this.employeeForm.get('name')?.value)
			formData.append('email',this.employeeForm.get('email')?.value)
			formData.append('position',this.employeeForm.get('position')?.value)
			formData.append('profilePicture',this.selectedFile);

			const reader = new FileReader();
			reader.onload = () =>{
				const imageUrl = reader.result as string;
				this.empService.addEmployee({
					...this.employeeForm.value,
					profilePicture:imageUrl
				}).subscribe(()=>{
					this.router.navigate(['/employees']);
				})
			};
			reader.readAsDataURL(this.selectedFile);
		}
	}

}

