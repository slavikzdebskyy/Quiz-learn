import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {



  constructor(private route: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'cards',
      sanitizer.bypassSecurityTrustResourceUrl('./../../../../assets/svg/cards.svg'));
    iconRegistry.addSvgIcon(
      'learn',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/learn.svg'));
    iconRegistry.addSvgIcon(
      'write',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/write.svg'));
    iconRegistry.addSvgIcon(
      'puzzle',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/puzzle.svg'));
}

  ngOnInit() {
    console.log('ROUTE =>', this.route.url.split('/').slice(-1).pop());
  }

  get pathUrl(): string {
    return this.route.url.split('/').slice(-1).pop();
  }

}
