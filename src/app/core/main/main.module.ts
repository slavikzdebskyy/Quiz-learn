import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { DictionaryService } from 'src/app/shared/services/dictionary.service';

import { MainComponent } from './main.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { CardsComponent } from './cards/cards.component';
import { LearnComponent } from './learn/learn.component';
import { WriteComponent } from './write/write.component';
import { GameComponent } from './game/game.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    AngularDraggableModule
  ],
  exports: [
    MainComponent,
    CardsComponent,
    MainNavbarComponent,
    LearnComponent
  ],
  providers: [DictionaryService],
  declarations: [
    MainComponent,
    MainNavbarComponent,
    CardsComponent,
    LearnComponent,
    WriteComponent,
    GameComponent
  ]
})
export class MainModule { }
