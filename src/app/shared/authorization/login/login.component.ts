import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authorization.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  logined = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPswrd: ['', [Validators.required, Validators.minLength(6)]]
    });
}

  get form () {
    return this.loginForm.controls;
  }

  get isPasswordsEqual () {
    return this.form.password.value === this.form.confirmPswrd.value && !!this.form.confirmPswrd.value;
  }

  login() {
    this.logined = true;
    if (this.loginForm.invalid || !this.isPasswordsEqual) {
        return;
    }
    // logic .....
  }

}
