import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-multi-form',
  templateUrl: './multi-form.component.html',
  styleUrls: ['./multi-form.component.css']
})
export class MultiFormComponent implements OnInit{
  
  ngOnInit(): void {
    
  }

  form1 = new FormBuilder().group({
    name: [''],
    email: [''],
    password: ['']
  });
  form2 = new FormBuilder().group({
    address: [''],
    phone: ['']
  });
  form3 = new FormBuilder().group({
    notes: ['']
  });

  activeStep =0;

  constructor(private fb: FormBuilder) {}

  next() {
    if (this.form1.valid && this.form2.valid) {
      this.activeStep++;
    }
  }

  submit() {
    console.log(this.form1.value);
    console.log(this.form2.value);
    console.log(this.form3.value);
  }

}
