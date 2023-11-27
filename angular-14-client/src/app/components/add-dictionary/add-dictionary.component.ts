import { Component } from '@angular/core';
import { Dictionary } from 'src/shared/models/dictionary.model';
import { DictionaryService } from 'src/core/services/dictionary.service';

@Component({
  selector: 'app-add-dictionary',
  templateUrl: './add-dictionary.component.html',
  styleUrls: ['./add-dictionary.component.css']
})
export class AddDictionaryComponent {

  dictionary: Dictionary = {
    reference_Lang: '',
    learning_Lang: '',
    learning_Word: '',
    learning_Word_Synonyms: [],
    reference_Word: '',
    reference_Word_Synonyms: [],
    published: false
  };
  submitted = false;
// Observable<any> dictionary = db.object('tutorial').valueChanges();


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
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  newDictionary(): void {
    this.submitted = false;
    this.dictionary = {
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