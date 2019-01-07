import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class StorageService {

  private storageSub = new Subject<boolean>();
  private localStorageDBKey: string = environment.localStorageDBKey;
  private localStorageSocialKey: string = environment.localStorageSocialKey;

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(isSocial: boolean, data: any): void {
    const key = isSocial ? this.localStorageSocialKey : this.localStorageDBKey;
    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  removeItem(isSocial: boolean): void {
    const key = isSocial ? this.localStorageSocialKey : this.localStorageDBKey;
    localStorage.removeItem(key);
    this.storageSub.next(true);
  }

  getItem(isSocial: boolean): string {
    const key = isSocial ? this.localStorageSocialKey : this.localStorageDBKey;
    return localStorage.getItem(key);
  }
}
