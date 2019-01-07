import { Injectable } from '@angular/core';
import { Word, WordForQuiz, WordForGame, ElementSize, Offset } from '../models/word.model';
import { environment } from 'src/environments/environment';
import { dictionary } from './../../../data/dictionary';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DictionaryService {

  private dictionary: Word[];
  private endpoints: any = environment.local;
  private apiBaseUrlServer: string = environment.apiBaseUrlServer;

  constructor(private httpClient: HttpClient) {
    this.getWordsByTitle().subscribe(res => {
      if (res['status']) {
        this.dictionary = res['words'];
      }
    });
  }


  addNewWord (word: Word) {
    return this.httpClient.post(`${this.apiBaseUrlServer}${this.endpoints.addWord}`, word);
  }


  getTranslate (word: string, isUa: boolean = false) {
    return isUa ? this.dictionary.find(el => el.ua === word).eng : this.dictionary.find(el => el.eng === word).ua;
  }

  getWordsByTitle (title: string = 'all'):  Observable<Word[]> {
    const request = `${this.apiBaseUrlServer}${this.endpoints.getWordsByTitle}/${title}`;
    return this.httpClient.get<Word[]>(request);
  }

}
