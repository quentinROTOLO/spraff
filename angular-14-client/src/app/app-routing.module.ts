import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryListComponent } from '../protected/dictionary-list/dictionary-list.component';
import { DictionaryDetailsComponent } from '../protected/dictionary-details/dictionary-details.component';
import { AddDictionaryComponent } from '../protected/add-dictionary/add-dictionary.component';

const routes: Routes = [
  { path: '', redirectTo: 'dictionary', pathMatch: 'full' },
  { path: 'dictionary', component: DictionaryListComponent },
  { path: 'dictionary/:key', component: DictionaryDetailsComponent },
  { path: 'add', component: AddDictionaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }