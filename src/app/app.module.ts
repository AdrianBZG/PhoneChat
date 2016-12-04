import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { Login as LoginPage } from '../pages/login/pages';
import { SignUp as SignUpPage } from '../pages/signup/pages';
import { Chat as ChatPage } from '../pages/chat/pages';
import { Conversation as ConversationApp } from '../pages/conversation/pages';
import { Settings as SettingsApp } from '../pages/settings/pages';
import { ChatBubble } from '../pages/chat-bubble/pages';

import { AppService } from '../services/app.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ChatPage,
    ChatBubble,
    ConversationApp,
    SettingsApp,
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
    ChatBubble,
    ConversationApp,
    SettingsApp,
  ],
  providers: [
    AppService,
    Storage
  ]
})

export class AppModule { }