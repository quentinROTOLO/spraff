import { Injectable } from '@angular/core';
import { Dictionary } from '../../shared/models/dictionary.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dbPath = '/dictionaries';
  dictionariesRef: AngularFireList<Dictionary>;
  items: Observable<any[]>;

  constructor(private angularFireDb: AngularFireDatabase) {
    this.dictionariesRef = angularFireDb.list(this.dbPath);
    this.items = this.angularFireDb.list(this.dbPath).valueChanges();
  }

  getAll(): AngularFireList<Dictionary> {
    console.log(this.dictionariesRef);
    return this.dictionariesRef;
  }

  getOne(key: string): Observable<Dictionary | null> {
    console.log(this.items);
    // Use snapshotChanges() to get a list of changes
    return this.dictionariesRef.snapshotChanges().pipe(
      map((changes) => {
        // Find the specific change that matches the key
        const change = changes.find((c) => c.key === key);

        // If a change is found, return the corresponding data, otherwise, return null
        if (change) {
          const data = change.payload.val() as Dictionary;
          return { key: change.key, ...data };
        } else {
          return null;
        }
      })
    );
  }

  create(dictionary: Dictionary): any {
    return this.dictionariesRef.push(dictionary);
  }

  update(key: string, update: any): Promise<void> {
    return this.dictionariesRef.update(key, update);
  }

  delete(key: string): Promise<void> {
    return this.dictionariesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dictionariesRef.remove();
  }
}
