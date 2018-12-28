export interface Word {
  ua: string;
  eng: string;
  title: string;
}

export interface WordForQuiz {
  word: string;
  answers: string[];
  answer: string;
}

export interface WordForGame {
  displayWord: string;
  hiddenWord: string;
  offset: Offset;
}

export interface Offset {
  x: number;
  y: number;
  z: number;
}

export interface ElementSize {
  width: number;
  height: number;
}
