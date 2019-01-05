import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { ElementSize, WordForGame, Offset } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('gameArea') gameArea: ElementRef;

  currElemHiddenValue: string;
  isEndOfGame = false;
  isStartOfGame = true;
  containerSize: ElementSize;
  wordsForGame: WordForGame[];
  time = 0;
  intervalId: any;

  constructor(private dictionaryService: DictionaryService) { }



  ngOnInit() {
    this.containerSize = {
      height : this.gameArea.nativeElement.offsetHeight,
      width : this.gameArea.nativeElement.offsetWidth
    };
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.time++;
    }, 1000);
  }

  stopTimer() {
     clearInterval(this.intervalId);
  }

  startGame() {
    this.isStartOfGame = false;
    this.wordsForGame = this.dictionaryService.getRandomWordsForGame(this.containerSize, 'all', 3);
    this.startTimer();
  }

  dragStart(offset: Offset, word: string) {
    offset.z = 0;
    this.currElemHiddenValue = word;
  }

  gragStop(offset: Offset) {
    offset.z = 1;
  }

  checkWords (word: string) {
    if (word === this.currElemHiddenValue) {
      const indexOne = this.wordsForGame.findIndex(el => el.displayWord === word);
      this.wordsForGame.splice(indexOne, 1);
      const indexTwo = this.wordsForGame.findIndex(el => el.hiddenWord === word);
      this.wordsForGame.splice(indexTwo, 1);
      if (!this.wordsForGame.length) {
        this.isEndOfGame = true;
        this.stopTimer();
      }
    }
  }

  restartGame () {
    this.isEndOfGame = false;
    this.isStartOfGame = true;
    this.time = 0;
    this.stopTimer();
  }

}
