import { Component, OnInit } from '@angular/core';
import { Dictionary } from 'src/app/models/dictionary.model';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.css']
})
export class DictionaryListComponent implements OnInit {

  dictionaries?: Dictionary[];
  currentDictionary: Dictionary = {};
  currentIndex = -1;
  referenceWord= '';
  learningWord = ''; 

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.retrieveDictionary();
  }

  retrieveDictionary(): void {
    this.dictionaryService.getAll()
      .subscribe({
        next: (data) => {
          this.dictionaries = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDictionary();
    this.currentDictionary = {};
    this.currentIndex = -1;
  }

  setActiveDictionary(dictionary: Dictionary, index: number): void {
    this.currentDictionary = dictionary;
    this.currentIndex = index;
  }

  removeAllDictionaries(): void {
    this.dictionaryService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchReferenceWord(): void {
    this.currentDictionary = {};
    this.currentIndex = -1;

    this.dictionaryService.findByReferenceWord(this.referenceWord)
      .subscribe({
        next: (data) => {
          this.dictionaries = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

searchLearningWord(): void {
    this.currentDictionary = {};
    this.currentIndex = -1;

    this.dictionaryService.findByLearningWord(this.learningWord)
      .subscribe({
        next: (data) => {
          this.dictionaries = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}