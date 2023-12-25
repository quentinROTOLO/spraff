import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private getUserFromFirestore(fields: any): User {
    return new User({
     id: fields.id.stringValue,
     email: fields.email.stringValue,
     name: fields.name.stringValue,
    });
   }
   private getDataForFirestore(user: User): Object {
    return {
     fields: {
      id: { stringValue: user.id },
      email: { stringValue: user.email },
      name: { stringValue: user.name },
     }
    };
   }
   private getStructuredQuery(userId: string): Object {
    return {
     'structuredQuery': {
      'from': [{
       'collectionId': 'users'
      }],
      'where': {
       'fieldFilter': {
        'field': { 'fieldPath': 'id' },
        'op': 'EQUAL',
        'value': { 'stringValue': userId }
       }
      },
      'limit': 1
     }
    };
   }
   
   get(userId: string, jwt: string): Observable<User|null> {
    const url =
     `${environment.firebase.firestore.baseURL}:runQuery?key=
      ${environment.firebase.apiKey}`;
    const data = this.getStructuredQuery(userId);
    const httpOptions = {
     headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${jwt}`
     })
    };
    
    return this.http.post(url, data, httpOptions).pipe(
     switchMap((data: any) => {
      return of(this.getUserFromFirestore(data[0].document.fields));
     })
    );
   }
   
  save(user: User, jwt: string): Observable<User|null> {
   const url = 
    `${environment.firebase.firestore.baseURL}/users?key=
     ${environment.firebase.apiKey}&documentId=${user.id}`;
  
   const data = this.getDataForFirestore(user);
   const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': `Bearer ${jwt}`
    })
   };
  
   return this.http.post(url, data, httpOptions).pipe(
    switchMap((data: any) => {
     return of(this.getUserFromFirestore(data.fields));
    })
   );
  }

  update(user: User): Observable<User|null> {
    const url = `${environment.firebase.firestore.baseURL}/users/${user.id}
     key=${environment.firebase.apiKey}&currentDocument.exists=true`;
    const data = this.getDataForFirestore(user);
    const httpOptions = {
     headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     })
    };
    
    return this.http.patch(url, data, httpOptions).pipe(
     switchMap((data: any) => {
      return of(this.getUserFromFirestore(data.fields));
     })
    );
   }
}
