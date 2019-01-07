import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationModule } from './authorization/authorization.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule
  ],
  declarations: [],
  providers: [
  ],
})
export class SharedModule { }
