import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { ElementSize, WordForGame, Offset } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('game') gameContainer: ElementRef;

  currElemHiddenValue: string;
  containerSize: ElementSize;
  wordsForGame: WordForGame[];

  constructor(private dictionaryService: DictionaryService) { }



  ngOnInit() {
    this.containerSize = {
      height : this.gameContainer.nativeElement.offsetHeight,
      width : this.gameContainer.nativeElement.offsetWidth
    };
    this.wordsForGame = this.dictionaryService.getRandomWordsForGame(this.containerSize, 'all', 6);
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
    }
  }

}
