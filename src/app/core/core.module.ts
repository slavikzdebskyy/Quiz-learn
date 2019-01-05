import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';

import { MainModule } from './main/main.module';
import { StorageService } from '../shared/services/storage.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent],
  providers: [StorageService]
})
export class CoreModule { }
