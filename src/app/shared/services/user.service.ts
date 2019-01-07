import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) {	}

  private endpoints: any = environment.local;
  private apiBaseUrlServer: string = environment.apiBaseUrlServer;

  addNewUser (user: User) {
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.saveUser}`, user);
 }

  login (email: string, password: string) {
    const data = {'email': email, 'password': password};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.loginUser}`, data);
  }

  getUserByToken (token) {
    const data = {'token': token};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.acountUser}`, data);
  }

  logout () {
    const token = {'token': this.storageService.getItem(false)};
    this.storageService.removeItem(false);
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.logOutUser}`, token);
  }
}
