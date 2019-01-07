import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';

import { AppComponent } from './app.component';

import getAuthServiceConfigs from './shared/authorization/get-auth-service-configs';
import { routers } from './app.routes';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { StorageService } from './shared/services/storage.service';
import { AuthLoginService } from './shared/services/auth.login.service';
import { UserService } from './shared/services/user.service';
import { AdministratorService } from './shared/services/administrator.service';
import { DictionaryService } from './shared/services/dictionary.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    SocialLoginModule,
    RouterModule.forRoot(routers),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthLoginService,
    StorageService,
    UserService,
    AdministratorService,
    DictionaryService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
