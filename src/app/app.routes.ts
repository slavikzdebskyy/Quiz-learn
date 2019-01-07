import { Routes } from '@angular/router';

import { AuthLoginService } from './shared/services/auth.login.service';

import { LoginComponent } from './shared/authorization/login/login.component';
import { SignUpComponent } from './shared/authorization/sign-up/sign-up.component';
import { MainComponent } from './core/main/main.component';
import { CardsComponent } from './core/main/cards/cards.component';
import { LearnComponent } from './core/main/learn/learn.component';
import { WriteComponent } from './core/main/write/write.component';
import { GameComponent } from './core/main/game/game.component';
import { AdministratorComponent } from './shared/authorization/administrator/administrator.component';

export const routers: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthLoginService],
    children: [
      { path: 'cards', component: CardsComponent},
      { path: 'learn', component: LearnComponent},
      { path: 'write', component: WriteComponent},
      { path: 'game', component: GameComponent},
      { path: '', redirectTo: 'cards', pathMatch: 'full' }
  ]},
  { path: 'administrator', component: AdministratorComponent },
  // {path: 'user_acount', component: UserAcountComponent, canActivate: [AuthLoginService]},
];
