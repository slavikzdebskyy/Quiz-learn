import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word.model';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  openOrCloseCardClassName = '';
  lang: string = Math.floor(Math.random() * 2) ? 'ua' : 'eng';
  langOpposite: string = this.lang === 'ua' ? 'eng' : 'ua';
  slideIndex = 0;
  words: Word[] = [];
  loadingWidth = 0;


  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.dictionaryService.getWordsByTitle('airport').subscribe(res => {
      console.log(res);
      if (res['status']) {
        this.words = res['words'];
        console.log(this.words);
        this.loadingWidth = ((this.slideIndex + 1) / this.words.length) * 100;
      }
    });
  }

  flipCard () {
    this.openOrCloseCardClassName = this.openOrCloseCardClassName === 'opened' ? '' : 'opened';
  }

  prevSlide () {
    this.slideIndex = this.slideIndex > 0 ? this.slideIndex = this.slideIndex - 1 : this.slideIndex = 0;
    this.loadingWidth = ((this.slideIndex + 1) / this.words.length) * 100;
  }

  nextSlide () {
    this.slideIndex = this.slideIndex < this.words.length - 1 ? this.slideIndex + 1 : this.words.length - 1;
    this.loadingWidth = ((this.slideIndex + 1) / this.words.length) * 100;
  }
}
