import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authorization.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isShowErrors = false;
  isLoader = false;
  isForm = true;
  isLoginSuccessful = false;
  isWrongCredentials = false;
  userFullName: string;
  dataBind: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit () {
    const userToken = this.storageService.getItem(false);
    if (userToken) {
      this.userService.getUserByToken(userToken).subscribe(res => {
        if (res['status']) {
          this.isForm = false;
          this.isLoginSuccessful = true;
          this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
        }
      });
    }

    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
}

  get form () {
    return this.loginForm.controls;
  }

  isLogined (name) {
    this.userFullName = name;
    this.isForm = false;
    this.isLoginSuccessful = true;
    }

  login() {
    this.isShowErrors = true;
    this.isLoader = this.loginForm.valid;
    if (this.loginForm.invalid) {
        return;
    }
    this.userService.login(this.form.email.value, this.form.password.value).subscribe(res => {
      if (res['status']) {
        this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
        this.isForm = false;
        this.isLoginSuccessful = true;
        this.storageService.setItem(false, res['token']);
      } else {
        this.isForm = false;
        this.isWrongCredentials = true;
      }
    });
  }

  backToLogin () {
    this.isShowErrors = false;
    this.isLoader = false;
    this.isForm = true;
    this.isLoginSuccessful = false;
    this.isWrongCredentials = false;
    this.userFullName = '';
    this.loginForm.reset();
  }

}
