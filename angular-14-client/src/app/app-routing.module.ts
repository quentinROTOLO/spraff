import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryListComponent } from './components/dictionary-list/dictionary-list.component';
import { DictionaryDetailsComponent } from './components/dictionary-details/dictionary-details.component';
import { AddDictionaryComponent } from './components/add-dictionary/add-dictionary.component';

const routes: Routes = [
  { path: '', redirectTo: 'dictionary', pathMatch: 'full' },
  { path: 'dictionary', component: DictionaryListComponent },
  { path: 'dictionary/:id', component: DictionaryDetailsComponent },
  { path: 'add', component: AddDictionaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }