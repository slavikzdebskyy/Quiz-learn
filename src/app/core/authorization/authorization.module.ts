import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';

import getAuthServiceConfigs from './get-auth-service-configs';

import { SigninComponent } from './signin/sign-in.component';
import { LoginComponent } from './login/login.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  exports: [
    SigninComponent,
    LoginComponent,
    SocialAuthComponent
  ],
  declarations: [SigninComponent, LoginComponent, SocialAuthComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class AuthorizationModule { }
