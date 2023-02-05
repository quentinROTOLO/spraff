import { Component } from '@angular/core';
import { Dictionary } from 'src/app/models/dictionary.model';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-add-dictionary',
  templateUrl: './add-dictionary.component.html',
  styleUrls: ['./add-dictionary.component.css']
})
export class AddDictionaryComponent {

  dictionary: Dictionary = {
    id: 0,
    reference_Lang: '',
    learning_Lang: '',
    learning_Word: '',
    learning_Word_Synonyms: [],
    reference_Word: '',
    reference_Word_Synonyms: [],
    published: false
  };
  submitted = false;

  constructor(private dictionaryService: DictionaryService) { }

  saveDictionary(): void {
    const data = {
      reference_Lang: this.dictionary.reference_Lang,
      learning_Lang: this.dictionary.learning_Lang,
      learning_Word: this.dictionary.learning_Word,
      learning_Word_Synonyms: this.dictionary.learning_Word_Synonyms,
      reference_Word: this.dictionary.reference_Word,
      reference_Word_Synonyms: this.dictionary.learning_Word_Synonyms,
    };

    this.dictionaryService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDictionary(): void {
    this.submitted = false;
    this.dictionary = {
      id: 0,
      reference_Lang: '',
      learning_Lang: '',
      learning_Word: '',
      learning_Word_Synonyms: [],
      reference_Word: '',
      reference_Word_Synonyms: [],
      published: false
    };
  }

}