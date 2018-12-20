import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { CardsComponent } from './cards/cards.component';
import { LearnComponent } from './learn/learn.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    MainComponent,
    CardsComponent,
    MainNavbarComponent,
    LearnComponent
  ],
  declarations: [MainComponent, MainNavbarComponent, CardsComponent, LearnComponent]
})
export class MainModule { }
