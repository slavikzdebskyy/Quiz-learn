import { Component, OnInit } from '@angular/core';
import { Words } from 'src/app/shared/models/words.model';
import { dictionary } from 'src/data/dictionary';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  questionIndex = 0;
  questions: any[];
  loadingWidth = 0;
  progressWidth = 100;
  isQuestion = true;
  isRight = true;
  wrongAnswer = '';
  currWrongAnswers = 0;

  constructor() { }

  ngOnInit() {
    this.questions = this.getTenRandomIndexes(dictionary);
    this.loadingWidth = ((this.questionIndex + 1) / this.questions.length) * 100;
  }

  getTenRandomIndexes (wordsArray: Words[]) {
    const indexes = [];
    const result = [];
    for (let i = 0; i < 10; i++) {
      let isUnique = true;
      while (isUnique) {
        const randomIndex = Math.floor(Math.random() * (wordsArray.length - 1));
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
          const obj = {
            'word' : wordsArray[randomIndex].eng,
            'answers' : this.getFourAnswersIndexes(randomIndex, wordsArray),
            'answer' : wordsArray[randomIndex].ua
          };
          result.push(obj);
          isUnique = false;
        }
      }
    }
    return result;
  }

  getFourAnswersIndexes (currIndex: number, wordsArray: Words[]) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      let isUnique = true;
      while (isUnique) {
        const randomIndex = Math.floor(Math.random() * (wordsArray.length - 1));
        if (!result.includes(randomIndex) && randomIndex !== currIndex) {
          result.push(wordsArray[randomIndex].ua);
          isUnique = false;
        }
      }
    }
    result[Math.floor(Math.random() * 4)] = wordsArray[currIndex].ua;
    return result;
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

  getTranslate (word, isUa) {
      return isUa ? dictionary.find(el => el.ua === word).eng : dictionary.find(el => el.eng === word).ua;
  }


}
