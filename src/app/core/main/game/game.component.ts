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
  wordsForGame: WordForGame[] = [];
  time = 0;
  wordsCount = 7;
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
    this.getRandomWordsForGame(this.containerSize, 'all', this.wordsCount);
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

  getRandomWordsForGame (size: ElementSize, title: string = 'all', count: number = 10) {
    this.dictionaryService.getWordsByTitle(title).subscribe(res => {
      if (res['status']) {
        const wordsByTitle = res['words'];
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
        this.wordsForGame = result;

      }
    });
  }

}
