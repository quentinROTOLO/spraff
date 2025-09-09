import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDictionaryComponent } from '../protected/add-dictionary/add-dictionary.component'
import { DictionaryDetailsComponent } from '../protected/dictionary-details/dictionary-details.component';
import { DictionaryListComponent } from '../protected/dictionary-list/dictionary-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDictionaryComponent,
    DictionaryDetailsComponent,
    DictionaryListComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase()),
  provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
