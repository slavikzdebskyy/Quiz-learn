import { Routes } from '@angular/router';

import { LoginComponent } from './core/authorization/login/login.component';
import { SignUpComponent } from './core/authorization/sign-up/sign-up.component';

export const routers: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-in', component: SignUpComponent},
  // {path: 'user_acount', component: UserAcountComponent, canActivate: [AuthLoginService]},
];
