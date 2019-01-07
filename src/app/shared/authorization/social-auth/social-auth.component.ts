import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['../authorization.scss']
})
export class SocialAuthComponent implements OnInit {

  constructor(
    private socialAuthService: AuthService,
    private storageService: StorageService,
    private userService: UserService) { }

    @Output()
    userDidLogined = new EventEmitter();

  ngOnInit() {

  }

  postUserName (name: string) {
    this.userDidLogined.emit(name);
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
        if (userData.name) {
          const user = JSON.stringify(userData);
          this.storageService.setItem(true, user);
          this.postUserName(userData.name);
        }
      }
    );

  }

}
