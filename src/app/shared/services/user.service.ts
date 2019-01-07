import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) {	}

  private endpoints: any = environment.local;
  private apiBaseUrlServer: string = environment.apiBaseUrlServer;



  addNewUser (user: User) {
    // const headers = {'headers' : this.addHeaders()};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.saveUser}`, user);
 }

  login (email: string, password: string) {
    // const headers = {'headers' : this.addHeaders()};
    const data = {'email': email, 'password': password};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.loginUser}`, data);
  }

  getUserByToken (token) {
    // const headers = {'headers' : this.addHeaders()};
    const data = {'token': token};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.acountUser}`, data);
  }

  logout () {
    // const headers = this.addHeaders();
    const token = {'token': this.storageService.getItem()};
    this.storageService.removeItem();
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.logOutUser}`, token);
  }

  // addHeaders(): HttpHeaders {
  //   return  new HttpHeaders()
  //     .set('Content-Type', 'application/json; charset=utf-8')
  //     .set('Authorization', this.storageService.getItem());
  // }
}
