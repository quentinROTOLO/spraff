import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDictionaryComponent } from './add-dictionary/add-dictionary.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { DictionaryDetailsComponent } from './dictionary-details/dictionary-details.component';


const routes: Routes = [
  { path: 'addDictionary', component: AddDictionaryComponent },
  // On charge paresseument notre route :
  {
    path: 'dictionaryList', component: DictionaryListComponent
    // loadChildren: () => import('./login/login.module').then(m => m.LoginModule) //loadChildren : import(<chemin_relatif>).then(m => m.<classe_du_module>)
  },
  {
    path: 'dictionaryDetails', component: DictionaryDetailsComponent
    // loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }