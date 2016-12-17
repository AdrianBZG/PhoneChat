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
import { ConversationSettings } from '../pages/conversation-settings/pages';
import { EventList as EventList } from '../pages/event-list/pages';
import { Sensors as Sensors } from '../pages/sensors/pages';

import { AppService } from '../services/app.service';
import { EventService } from '../services/event.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ChatPage,
    ChatBubble,
    ConversationApp,
    SettingsApp,
    ConversationSettings,
    EventList,
    Sensors,
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
    ConversationSettings,
    EventList,
    Sensors,
  ],
  providers: [
    AppService,
    EventService,
    Storage
  ]
})

export class AppModule { }
