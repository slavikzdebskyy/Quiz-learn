import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { Word } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  constructor(private dictionaryService: DictionaryService) { }


  questions: Word[] = [];
  questionIndex = 0;
  isQuestion = true;
  isRight = true;
  lang: string = Math.floor(Math.random() * 2) ? 'ua' : 'eng';
  langOpposite: string = this.lang === 'ua' ? 'eng' : 'ua';
  wrongAnswerCount = 0;
  rightAnswerCount = 0;
  wrongWidth = 0;
  rightWidth = 0;
  lefttWidth = 0;

  ngOnInit() {
    this.dictionaryService.getWordsByTitle('airport').subscribe(res => {
      if (res['status']) {
        this.questions = res['words'];
      }
    });
  }

  checkAnswer (usersAnswer) {
    this.isQuestion = false;
    if (this.questions[this.questionIndex][this.langOpposite] !== usersAnswer.value) {
      this.isRight = false;
      this.wrongAnswerCount++;
    } else {
      this.rightAnswerCount++;
    }
    this.wrongWidth = (this.wrongAnswerCount / this.questions.length) * 100;
    this.rightWidth = (this.rightAnswerCount / this.questions.length) * 100;
    this.lefttWidth = 100 - ((this.questions.length - this.questionIndex) / this.questions.length) * 100;
  }

  nextQuestion () {
    if (!this.isQuestion) {
      this.questionIndex++;
      this.isQuestion = true;
      this.isRight = true;
    }
  }
}
