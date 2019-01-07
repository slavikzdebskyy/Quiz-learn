import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from '../../models/word.model';
import { Admin } from '../../models/administrator.model';
import { AdministratorService } from '../../services/administrator.service';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['../authorization.scss']
})
export class AdministratorComponent implements OnInit {

  addWordForm: FormGroup;
  adminsForm: FormGroup;
  isAdminsOrWordForm = true;
  isLoginOrSignUp = true;
  isLoader = false;
  isShowFormsErrors = false;
  newWord: Word;
  admin: Admin;
  titles: string[] = ['airport', 'sport'];


  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private dictionaryService: DictionaryService)  { }

  ngOnInit() {
    this.addWordForm = this.formBuilder.group({
      eng: ['', [Validators.required]],
      ua: ['', [Validators.required]],
      title: ['', [Validators.required]]
    });
    this.adminsForm = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formWord () {
    return this.addWordForm.controls;
  }

  get formAdmins () {
    return this.adminsForm.controls;
  }

  addNewWord () {
    if (this.addWordForm.invalid) {
      this.isShowFormsErrors = true;
      return;
    }
    this.newWord = {'eng' : this.formWord.eng.value, 'ua' : this.formWord.ua.value, 'title' : this.formWord.title.value};
    this.dictionaryService.addNewWord(this.newWord).subscribe(res => {
      console.log('New word =>', res);
      this.addWordForm.reset();
    });
  }

  submitAdmin () {
    if (this.adminsForm.invalid) {
      this.isShowFormsErrors = true;
      return;
    }
    this.isLoader = true;
    this.admin = new Admin(this.formAdmins.nickName.value, this.formAdmins.password.value);
    if (!this.isLoginOrSignUp) {
      this.administratorService.addNewAdmin(this.admin).subscribe(res => {
        if (res['status']) {
          this.isLoginOrSignUp = true;
          this.isLoader = false;
          this.isShowFormsErrors = false;
        }
      });
    } else {
      this.administratorService.loginAdmin(this.admin).subscribe(res => {
        if (res['status']) {
          this.isAdminsOrWordForm = false;
          this.isLoader = false;
          this.isShowFormsErrors = false;
        }
      });
    }
    this.adminsForm.reset();
  }

}
