import { Component, Input, OnInit } from '@angular/core';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dictionary } from 'src/app/models/dictionary.model';

@Component({
  selector: 'app-dictionary-details',
  templateUrl: './dictionary-details.component.html',
  styleUrls: ['./dictionary-details.component.css']
})
export class DictionaryDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentDictionary: Dictionary = {
    id: 0, 
    reference_Lang: '', 
    learning_Lang: '', 
    learning_Word: '', 
    learning_Word_Synonyms: [],
    reference_Word: '', 
    reference_Word_Synonyms: [],
    published: false
  };
  
  message = '';

  constructor(
    private dictionaryService: DictionaryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDictionary(this.route.snapshot.params["id"]);
    }
  }

  getDictionary(id: string): void {
    this.dictionaryService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDictionary = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      id: this.currentDictionary.id, 
      referenceLang: this.currentDictionary.reference_Lang,
      learning_Lang: this.currentDictionary.learning_Lang,
      learning_Word: this.currentDictionary.learning_Word, 
      learning_Word_Synonyms: this.currentDictionary.learning_Word_Synonyms, 
      reference_Word: this.currentDictionary.reference_Word, 
      reference_Word_Synonyms: this.currentDictionary.reference_Word_Synonyms, 
      published: status
    };

    this.message = '';

    this.dictionaryService.update(this.currentDictionary.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentDictionary.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateDictionary(): void {
    this.message = '';

    this.dictionaryService.update(this.currentDictionary.id, this.currentDictionary)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This dictionary was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteDictionary(): void {
    this.dictionaryService.delete(this.currentDictionary.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dictionary']);
        },
        error: (e) => console.error(e)
      });
  }

}