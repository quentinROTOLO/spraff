import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dictionary } from '../models/dictionary.model';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

const baseUrl = 'http://localhost:8080/api/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private dbPath = '/dictionaries';

  dictionariesRef: AngularFireList<Dictionary>;

  constructor(private http: HttpClient, private fireDb: AngularFireDatabase) {
    this.dictionariesRef = fireDb.list(this.dbPath); 
 }

  getAll(): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(baseUrl);
  }

  get(id: any): Observable<Dictionary> {
    return this.http.get<Dictionary>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByLearningWord(learning_Word: any): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(`${baseUrl}?learning_Word=${learning_Word}`);
  }

  findByReferenceWord(reference_Word: any): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(`${baseUrl}?reference_Word=${reference_Word}`);
  }

}

