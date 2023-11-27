import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { DictionaryService } from '../../../core/services/dictionary.service';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.css'],
})
export class DictionaryListComponent implements OnInit {
  dictionaries?: Dictionary[];
  currentDictionary?: Dictionary;
  currentIndex = -1;
  referenceWord = '';
  learningWord = '';

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.retrieveDictionary();
    this.dictionaryService.getAll();
    // this.dictionaryService.getOne('1');
  }

  retrieveDictionary(): void {
    this.dictionaryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dictionaries = data;
    });
  }

  refreshList(): void {
    this.currentDictionary = undefined;
    this.currentIndex = -1;
    this.retrieveDictionary();
  }

  setActiveDictionary(dictionary: Dictionary, index: number): void {
    this.currentDictionary = dictionary;
    this.currentIndex = index;
  }

  removeAllDictionaries(): void {
    this.dictionaryService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  searchReferenceWord(): void {
    this.currentDictionary = {};
    this.currentIndex = -1;
  }

  searchLearningWord(): void {
    this.currentDictionary = {};
    this.currentIndex = -1;
  }
}
