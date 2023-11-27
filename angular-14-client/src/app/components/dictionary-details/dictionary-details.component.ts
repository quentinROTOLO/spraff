import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from '../../../shared/models/dictionary.model';

@Component({
  selector: 'app-dictionary-details',
  templateUrl: './dictionary-details.component.html',
  styleUrls: ['./dictionary-details.component.css'],
})
export class DictionaryDetailsComponent implements OnInit, OnChanges {
  @Input() dictionary?: Dictionary;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentDictionary: Dictionary = {
    key: '',
    reference_Lang: '',
    learning_Lang: '',
    learning_Word: '',
    learning_Word_Synonyms: [],
    reference_Word: '',
    reference_Word_Synonyms: [],
    published: false,
  };
  message = '';

  constructor(
    private dictionaryService: DictionaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  updatePublished(status: boolean): void {
    if (this.currentDictionary.key) {
      this.dictionaryService
        .update(this.currentDictionary.key, { published: status })
        .then(() => {
          this.currentDictionary.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch((err) => console.log(err));
    }
  }

  updateDictionary(): void {
    const data = {
      reference_Lang: this.currentDictionary.reference_Lang,
      learning_Lang: this.currentDictionary.learning_Lang,
      learning_Word: this.currentDictionary.learning_Word,
      learning_Word_Synonyms: this.currentDictionary.learning_Word_Synonyms,
      reference_Word: this.currentDictionary.learning_Word,
      reference_Word_Synonyms: this.currentDictionary.reference_Word_Synonyms,
    };
    if (this.currentDictionary.key) {
      this.dictionaryService
        .update(this.currentDictionary.key, data)
        .then(() => (this.message = 'The tutorial was updated successfully!'))
        .catch((err) => console.log(err));
    }
  }

  deleteDictionary(): void {
    if (this.currentDictionary.key) {
      this.dictionaryService
        .delete(this.currentDictionary.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch((err) => console.log(err));
    }
  }
}
