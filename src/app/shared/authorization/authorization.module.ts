import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';

import getAuthServiceConfigs from './get-auth-service-configs';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    RouterModule
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
    },
    UserService
  ]
})
export class AuthorizationModule { }
