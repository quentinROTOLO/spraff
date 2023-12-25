import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginFormComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ]
})
export class LoginModule { }
