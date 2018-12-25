import { Component, OnInit } from '@angular/core';
import { Words } from 'src/app/shared/models/words.model';
import { dictionary } from 'src/data/dictionary';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  openOrCloseCardClassName = '';
  slideIndex = 0;
  words: Words[];
  loadingWidth = 0;


  constructor() { }

  ngOnInit() {
    this.words = dictionary;
    this.loadingWidth = ((this.slideIndex + 1) / this.words.length) * 100;
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
