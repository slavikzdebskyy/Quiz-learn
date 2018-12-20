import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  sub;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
  }

}
