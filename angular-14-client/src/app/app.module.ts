import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDictionaryComponent } from './components/add-dictionary/add-dictionary.component'
import { DictionaryDetailsComponent } from './components/dictionary-details/dictionary-details.component';
import { DictionaryListComponent } from './components/dictionary-list/dictionary-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDictionaryComponent,
    DictionaryDetailsComponent,
    DictionaryListComponent, 
    // TODO
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
