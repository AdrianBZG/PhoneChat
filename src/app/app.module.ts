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
import {Sensors as Sensors} from "../pages/sensors/pages";
import {BrocolitoPage as BrocoPage} from "../pages/brocolito-page/pages";
import {AppService} from "../services/app.service";
import {EventService} from "../services/event.service";
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
    ],
    providers: [
        AppService,
        EventService,
        SensorsService,
        Storage
    ]
})

export class AppModule {
}
