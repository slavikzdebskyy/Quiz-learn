import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';
import { AdministratorComponent } from './administrator/administrator.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SignUpComponent,
    LoginComponent,
    SocialAuthComponent
  ],
  declarations: [SignUpComponent, LoginComponent, SocialAuthComponent, AdministratorComponent],
})
export class AuthorizationModule { }
