import { Routes } from '@angular/router';

import { LoginComponent } from './shared/authorization/login/login.component';
import { SignUpComponent } from './shared/authorization/sign-up/sign-up.component';
import { MainComponent } from './core/main/main.component';
import { CardsComponent } from './core/main/cards/cards.component';


export const routers: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignUpComponent } ,
  { path: 'main', component: MainComponent,
    children: [
      { path: 'cards', component: CardsComponent}
  ]},
  // {path: 'user_acount', component: UserAcountComponent, canActivate: [AuthLoginService]},
];
