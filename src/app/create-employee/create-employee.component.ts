import { Component } from '@angular/core';
import { Employee } from '../employee';
import { OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{

  url: string | ArrayBuffer | null | undefined;
  format: string | undefined;

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit(): void {
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data: any) => {
      console.log(data);
      },
      error: (err: any) => {
      console.log(err);
      },
      complete: () => {
      console.log('complete');
      this.goToEmployeeList();
      }
      }); 
    
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);

  }


  onSelectFile(event: { target: { files: any[]; }; }) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      else if(file.type.indexOf('audio')> -1){
        this.format = 'audio';
      }
      else if(file.type.indexOf('pdf')> -1){
        this.format = 'pdf';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  onSubmit(){

    console.log(this.employee);
    this.saveEmployee();
  }
}
