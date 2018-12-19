import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signInForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit () {
    this.signInForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPswrd: ['', [Validators.required, Validators.minLength(6)]]
    });
}

  get form () {
    return this.signInForm.controls;
  }

  get isPasswordsEqual () {
    return this.form.password.value === this.form.confirmPswrd.value && !!this.form.confirmPswrd.value;
  }

  signIn() {
    this.submitted = true;
    if (this.signInForm.invalid || !this.isPasswordsEqual) {
        return;
    }
    // logic .....
  }

}
