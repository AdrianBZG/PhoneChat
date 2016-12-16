var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { Sensors as SensorsPage } from '../pages/sensors/pages';
import { AppService } from '../services/app.service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            SignUpPage,
            ChatPage,
            ChatBubble,
            ConversationApp,
            SettingsApp,
            ConversationSettings,
            SensorsPage,
        ],
        imports: [
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LoginPage,
            SignUpPage,
            ChatPage,
            ChatBubble,
            ConversationApp,
            SettingsApp,
            ConversationSettings,
            SensorsPage,
        ],
        providers: [
            AppService,
            Storage
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
export { AppModule };
