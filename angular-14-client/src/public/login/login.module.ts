import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    LoginFormComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
