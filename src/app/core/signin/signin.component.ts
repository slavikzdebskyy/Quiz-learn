import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider,
  GoogleLoginProvider } from 'angular5-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  submitted: boolean = false;
  
  constructor( private socialAuthService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit () {
    this.signInForm = this.formBuilder.group({        
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
  
  socialSignIn (socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform === 'facebook'){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform === 'google'){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
       
            
      }
    );
  } 
}
