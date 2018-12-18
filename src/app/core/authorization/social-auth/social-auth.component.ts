import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {

  constructor( private socialAuthService: AuthService) { }

  ngOnInit() {

  }

  socialSignIn (socialPlatform: string) {
    let socialPlatformProvider;
    switch (socialPlatform) {
      case 'facebook':
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        break;
      case 'google':
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        break;
    }
    this.socialAuthService.signIn(socialPlatformProvider)
      .then(userData => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
      }
    );
  }

}
