import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    DictionaryListComponent
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
