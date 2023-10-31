import { Injectable } from '@angular/core';
import { Dictionary } from '../models/dictionary.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dbPath = '/dictionaries';
  dictionariesRef: AngularFireList<Dictionary>;

  constructor(private angularFireDb: AngularFireDatabase) {
    this.dictionariesRef = angularFireDb.list(this.dbPath);
  }

  getAll(): AngularFireList<Dictionary> {
    return this.dictionariesRef;
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
