import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

export const routes: Routes = [
    {path:'',redirectTo:'/employees',pathMatch:'full'},
    {path:'employees',component:EmployeeListComponent},
    {path:'add-employee',component:AddEmployeeComponent},
    {path:'employee/:id',component:EmployeeDetailsComponent},
    {path:'edit-employee/:id',component:EditEmployeeComponent}
];
