import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class StorageService {

  private storageSub = new Subject<boolean>();
  private localStorageName: string = environment.localStorageName;

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(data: any): void {
    localStorage.setItem(this.localStorageName, data);
    this.storageSub.next(true);
  }

  removeItem(): void {
    localStorage.removeItem(this.localStorageName);
    this.storageSub.next(true);
  }

  getItem(): string {
    return localStorage.getItem(this.localStorageName);
  }
}
