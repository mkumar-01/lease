import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth.service';
import { Router } from '@angular/router';
import { access_token } from '../../constant';

@Component({
  selector: 'login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(private authService: AuthServices) {

  }
  loginFormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),

    password: new FormControl("", [Validators.required])
  })
  get email() {
    return this.loginFormGroup.get('email');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }

  onLoginSubmit() {
    const email = this.loginFormGroup.value.email;
    const password = this.loginFormGroup.value.password;
    if (email && password) {
      this.authService.login(email, password);
    }

  }

}
