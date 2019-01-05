import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) {	}

  user: User;
  private endpoints: any = environment.local;
  private defaultToken: string = environment.defaultToken;

  addNewUser (user: User) {
    const headers = {headers : this.addHeaders()};
    return this.httpClient.post(this.endpoints.saveUser, user, headers);
 }

  login (email: string, password: string) {
    const headers = {headers : this.addHeaders()};
    const data = {'email': email, 'password': password};
    return this.httpClient.post(this.endpoints.loginUser, data, headers);
  }

  getUserByToken () {
    const headers = {headers : this.addHeaders()};
    return this.httpClient.get<User>(this.endpoints.acountUser, headers);
  }

  logout () {
    const headers = {headers : this.addHeaders()};
    const token = {'token': this.storageService.getItem()};
    this.storageService.removeItem();
    return this.httpClient.post(this.endpoints.logOutUser, token, headers);
  }

  addHeaders () {
    let token = this.storageService.getItem();
    if (!token) {
      token = this.defaultToken;
    }
    return new HttpHeaders ({
      'Contetnt-Type' : 'application/json',
      'Authorization' : token,
      'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Origin' : 'http://localhost:3000'
    });
  }

}
