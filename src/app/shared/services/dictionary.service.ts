import { Injectable } from '@angular/core';
import { Word, WordForQuiz } from '../models/word.model';
import { dictionary } from './../../../data/dictionary';

@Injectable()
export class DictionaryService {
  private dictionary: Word[] = dictionary;


  get allWords (): Word[] {
    return this.dictionary;
  }

  getWordsByTitle (title: string): Word[] {
    return this.dictionary.filter(item => item.title === title);
  }

  private getFourAnswersIndexes (currIndex: number, wordsArray: Word[], langOpposite: string): string[] {
    const result = [];
    for (let i = 0; i < 4; i++) {
      let isUnique = true;
      while (isUnique) {
        const randomIndex = Math.floor(Math.random() * (wordsArray.length - 1));
        if (!result.includes(randomIndex) && randomIndex !== currIndex) {
          result.push(wordsArray[randomIndex][langOpposite]);
          isUnique = false;
        }
      }
    }
    result[Math.floor(Math.random() * 4)] = wordsArray[currIndex][langOpposite];
    return result;
  }

  getRandomWordsForQuizByTitle (title: string = 'all', count: number = 10): WordForQuiz[] {
    const wordsByTitle = title === 'all' ? this.allWords : this.getWordsByTitle(title);
    const lang = Math.floor(Math.random() * 2) ? 'ua' : 'eng';
    const langOpposite = lang === 'ua' ? 'eng' : 'ua';
    const indexes = [];
    const result = [];
    for (let i = 0; i < count; i++) {
      let isUnique = true;
      while (isUnique) {
        const randomIndex = Math.floor(Math.random() * (wordsByTitle.length - 1));
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
          const obj = {
            'word' : wordsByTitle[randomIndex][lang],
            'answers' : this.getFourAnswersIndexes(randomIndex, wordsByTitle, langOpposite),
            'answer' : wordsByTitle[randomIndex][langOpposite]
          };
          result.push(obj);
          isUnique = false;
        }
      }
    }
    return result;
  }

  getTranslate (word: string, isUa: boolean = false): string {
    return isUa ? this.dictionary.find(el => el.ua === word).eng : dictionary.find(el => el.eng === word).ua;
}
}
