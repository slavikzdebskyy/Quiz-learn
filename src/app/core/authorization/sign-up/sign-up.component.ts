import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit () {
    this.signUpForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
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
    this.submitted = true;
    if (this.signUpForm.invalid || !this.isPasswordsEqual) {
        return;
    }
    // logic .....
  }

}
