import { Component, OnInit } from '@angular/core';
import { WordForQuiz, Word } from 'src/app/shared/models/word.model';
import { DictionaryService } from './../../../shared/services/dictionary.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  questions: WordForQuiz[] = [];
  questionIndex = 0;
  loadingWidth = 0;
  progressWidth = 100;
  isQuestion = true;
  isRight = true;
  wrongAnswer = '';
  currWrongAnswers = 0;
  wordsCount = 7;
  dictionary: Word[];

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.getRandomWordsForQuizByTitle();
    this.loadingWidth = Math.round(((this.questionIndex + 1) / this.questions.length) * 100);
  }

  checkAnswer (answer) {
    this.isQuestion = false;
    if (this.questions[this.questionIndex].answer !== answer) {
      this.isRight = false;
      this.wrongAnswer = answer;
      this.currWrongAnswers++;
    }
  }

  nextQuestion () {
    this.questionIndex = this.questionIndex < this.questions.length - 1 ? this.questionIndex + 1 : this.questionIndex;
    this.loadingWidth = ((this.questionIndex + 1) / this.questions.length) * 100;
    this.progressWidth = 100 - (this.currWrongAnswers / this.questions.length) * 100;
    this.isQuestion = true;
    this.isRight = true;
    this.wrongAnswer = '';
  }

  getTranslate (word: string, isUa: boolean = false) {
    return this.dictionaryService.getTranslate(word, isUa);
  }

  getRandomWordsForQuizByTitle (title: string = 'all', count: number = this.wordsCount) {
    this.dictionaryService.getWordsByTitle(title).subscribe(res => {
      if (res['status']) {
        const wordsByTitle = res['words'];
        this.dictionary = res['words'];
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
        this.questions = result;
      }
    });
  }

  getFourAnswersIndexes (currIndex: number, wordsArray: Word[], langOpposite: string): string[] {
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


}
