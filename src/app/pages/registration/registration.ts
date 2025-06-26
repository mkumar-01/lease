import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {
  registrationForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
  });

  get userName() {
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  onRegistrationSubmit() {
    console.log(this.registrationForm.value)
  }

}
