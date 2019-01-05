import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogined = false;
  userFullName: string;
  localStorageName = environment.localStorageName;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {

    if (this.storageService.getItem()) {
      this.userService.getUserByToken().subscribe(res => {
        if (res['status']) {
          this.isLogined = true;
          this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
        }
      });
    }

    this.storageService.watchStorage().subscribe(result => {
      if (result) {
        this.userService.getUserByToken().subscribe(res => {
          if (res['status']) {
            this.isLogined = true;
            this.userFullName = `${res['user'].name} ${res['user'].lastName}`;
          }
        });
      }
    });
  }

  logOut () {
    this.userService.logout().subscribe(res => {
      if (res['status']) {
        this.isLogined = false;
        this.router.navigate(['/']);
      }
    });
  }
}
