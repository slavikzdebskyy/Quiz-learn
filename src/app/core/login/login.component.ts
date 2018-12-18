import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider,
  GoogleLoginProvider } from 'angular5-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup;
  logined: boolean = false;
  
  constructor( private socialAuthService: AuthService, private formBuilder: FormBuilder) { }

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
