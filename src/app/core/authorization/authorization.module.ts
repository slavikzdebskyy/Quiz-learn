import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';

import getAuthServiceConfigs from './get-auth-service-configs';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  exports: [
    SignUpComponent,
    LoginComponent,
    SocialAuthComponent
  ],
  declarations: [SignUpComponent, LoginComponent, SocialAuthComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class AuthorizationModule { }
