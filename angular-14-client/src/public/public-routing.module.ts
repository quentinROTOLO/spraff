import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // On charge paresseument notre route :
  {
    path: 'login', component: LoginComponent
    // loadChildren: () => import('./login/login.module').then(m => m.LoginModule) //loadChildren : import(<chemin_relatif>).then(m => m.<classe_du_module>)
  },
  {
    path: 'register', component: RegisterComponent
    // loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }