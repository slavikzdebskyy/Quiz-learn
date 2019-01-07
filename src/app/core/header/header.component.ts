import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from 'angular5-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogined = false;
  userFullName: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private socialAuthService: AuthService) { }

  ngOnInit() {

    if (this.storageService.getItem(false)) {
      this.userService.getUserByToken(this.storageService.getItem(false))
      .subscribe(res => {
          if (res['status']) {
            this.isLogined = true;
            this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
          }
        });
    }

    if (this.storageService.getItem(true)) {
      const userData = JSON.parse(this.storageService.getItem(true));
      this.userFullName = userData.name;
    }

    this.storageService.watchStorage().subscribe(result => {
      if (result) {
        if (this.storageService.getItem(false)) {
          this.userService.getUserByToken(this.storageService.getItem(false)).subscribe(res => {
            if (res['status']) {
              this.isLogined = true;
              this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
            } else {
              this.isLogined = false;
              this.userFullName = '';
            }
          });
        }
        if (this.storageService.getItem(true)) {
          const userData = JSON.parse(this.storageService.getItem(true));
          this.isLogined = true;
          this.userFullName = userData.name;
        }
      }
    });
  }

  logOut () {
    if (this.storageService.getItem(false)) {
      this.userService.logout().subscribe(res => {
        if (res['status']) {
          this.isLogined = false;
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.socialAuthService.signOut()
        .then(data => {
          this.storageService.removeItem(true);
          this.isLogined = false;
          this.router.navigate(['/login']);
        })
        .catch(error => console.error(error));
    }

  }


}
