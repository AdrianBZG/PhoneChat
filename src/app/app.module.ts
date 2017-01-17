import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {MyApp} from "./app.component";
import {Login as LoginPage} from "../pages/login/pages";
import {SignUp as SignUpPage} from "../pages/signup/pages";
import {Chat as ChatPage} from "../pages/chat/pages";
import {Conversation as ConversationApp} from "../pages/conversation/pages";
import {Settings as SettingsApp} from "../pages/settings/pages";
import {ChatBubble} from "../pages/chat-bubble/pages";
import {ConversationSettings} from "../pages/conversation-settings/pages";
import {EventList as EventList} from "../pages/event-list/pages";
import {PeopleList as PeopleList} from "../pages/people-list/pages";
import {DevelopersPage as DevelopersPage} from "../pages/developers-page/pages";
import {PrivacySettings as PrivacySettings} from "../pages/privacy/pages";
import {Sensors as Sensors} from "../pages/sensors/pages";
import {BrocolitoPage as BrocoPage} from "../pages/brocolito-page/pages";
import {AppService} from "../services/app.service";
import {EventService} from "../services/event.service";
import {ImgurService} from "../services/imgur.service";
import {EmailJSService} from "../services/emailjs.service";
import {SensorsService} from "../services/sensors.service";

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
        BrocoPage,
        PeopleList,
        DevelopersPage,
        PrivacySettings,
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
        EventList,
        Sensors,
        BrocoPage,
        PeopleList,
        DevelopersPage,
        PrivacySettings,
    ],
    providers: [
        AppService,
        EventService,
        SensorsService,
        ImgurService,
        EmailJSService,
        Storage
    ]
})

export class AppModule {
}
