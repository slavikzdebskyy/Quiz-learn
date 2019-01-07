import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './../models/administrator.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdministratorService {

  constructor(private httpClient: HttpClient) {	}

  private endpoints: any = environment.local;
  private apiBaseUrlServer: string = environment.apiBaseUrlServer;

  addNewAdmin (admin: Admin) {
    // const headers = {'headers' : this.addHeaders()};
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.saveAdmin}`, admin);
 }

 loginAdmin (admin: Admin) {
  // const headers = {'headers' : this.addHeaders()};
  return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.loginAdmin}`, admin);
}

}
