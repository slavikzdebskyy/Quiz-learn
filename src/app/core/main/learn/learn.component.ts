import { Component, OnInit } from '@angular/core';
import { WordForQuiz } from 'src/app/shared/models/word.model';
import { DictionaryService } from './../../../shared/services/dictionary.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  questions: WordForQuiz[];
  questionIndex = 0;
  loadingWidth = 0;
  progressWidth = 100;
  isQuestion = true;
  isRight = true;
  wrongAnswer = '';
  currWrongAnswers = 0;

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.questions = this.dictionaryService.getRandomWordsForQuizByTitle();
    this.loadingWidth = ((this.questionIndex + 1) / this.questions.length) * 100;
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
      return this.dictionaryService.getTranslate(word, isUa);
  }


}
