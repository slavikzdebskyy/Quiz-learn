import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { FACEBOOK_APP_ID, GOOGLE_APP_ID } from 'src/environments/social.config';

import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';

export function getAuthServiceConfigs () {
  let config = new AuthServiceConfig (
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
	      provider: new FacebookLoginProvider (FACEBOOK_APP_ID)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	      provider: new GoogleLoginProvider (GOOGLE_APP_ID)
        },
      ]
  );
  return config;
}



@NgModule({
  imports: [
    CommonModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SigninComponent
  ],
  declarations: [HeaderComponent, SigninComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class CoreModule { }
