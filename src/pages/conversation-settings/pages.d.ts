import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ConversationService } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';
export declare class ConversationSettings {
    navCtrl: NavController;
    navParams: NavParams;
    menu: MenuController;
    conversationService: ConversationService;
    appService: AppService;
    title: String;
    constructor(navCtrl: NavController, navParams: NavParams, menu: MenuController, conversationService: ConversationService, appService: AppService);
    ionViewDidEnter(): void;
    ionViewWillLeave(): void;
    changeGroupName(newName: string): void;
    addPeople(uids: number[]): void;
    removePeople(uids: number[]): void;
}
