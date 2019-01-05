import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authorization.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isShowFormsErrors = false;
  isLoader = false;
  user: User;
  isSignUpSuccessful = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit () {
    this.signUpForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        enlishLevel: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPswrd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form () {
    return this.signUpForm.controls;
  }

  get isPasswordsEqual () {
    return this.form.password.value === this.form.confirmPswrd.value && !!this.form.confirmPswrd.value;
  }

  signUp() {
    this.isShowFormsErrors = true;
    this.isLoader = true;
    this.user = new User( this.form.firstName.value, this.form.lastName.value,
                          this.form.email.value, this.form.password.value,
                          this.form.country.value, this.form.city.value, this.form.enlishLevel.value);
    this.userService.addNewUser(this.user).subscribe(res => {
      this.isSignUpSuccessful = res['status'];
    });
  }



}
