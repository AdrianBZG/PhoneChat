import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { Login as LoginPage } from '../pages/login/pages';
import { SignUp as SignUpPage } from '../pages/signup/pages';
import { Chat as ChatPage } from '../pages/chat/pages';

import { AppService } from '../services/app.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ChatPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    ChatPage,
  ],
  providers: [
    AppService
  ]
})

export class AppModule { }
