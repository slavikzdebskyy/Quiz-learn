import { Injectable } from '@angular/core';
import { Word, WordForQuiz, WordForGame, ElementSize, Offset } from '../models/word.model';
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
          const obj: WordForQuiz = {
            word : wordsByTitle[randomIndex][lang],
            answers : this.getFourAnswersIndexes(randomIndex, wordsByTitle, langOpposite),
            answer : wordsByTitle[randomIndex][langOpposite]
          };
          result.push(obj);
          isUnique = false;
        }
      }
    }
    return result;
  }
  getRandomWordsForGame (size: ElementSize, title: string = 'all', count: number = 10): WordForGame[] {
    const wordsByTitle = title === 'all' ? this.allWords : this.getWordsByTitle(title);
    const result = [];
    const indexes = [];
    for (let i = 0; i < count; i++) {
      let isUnique = true;
      while (isUnique) {
        const randomIndex = Math.floor(Math.random() * (wordsByTitle.length - 1));
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
          const offsetUa: Offset = {
            x : Math.floor(Math.random() * (size.width - 150)),
            y : Math.floor(Math.random() * (size.height - 50)),
            z : 1
          };
          const offsetEng: Offset = {
            x : Math.floor(Math.random() * (size.width - 150)),
            y : Math.floor(Math.random() * (size.height - 50)),
            z : 1
          };
          const objUa: WordForGame = {
            displayWord : wordsByTitle[randomIndex].ua,
            hiddenWord : wordsByTitle[randomIndex].eng,
            offset : offsetUa
          };
          const objEng: WordForGame = {
            displayWord : wordsByTitle[randomIndex].eng,
            hiddenWord : wordsByTitle[randomIndex].ua,
            offset : offsetEng
          };
          result.push(objUa);
          result.push(objEng);
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
