import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';
import { AppService } from '../../services/app.service';
export declare class Chat {
    navCtrl: NavController;
    navParams: NavParams;
    menu: MenuController;
    alertCtrl: AlertController;
    appService: AppService;
    user: String;
    topicChats: DialogMsg[];
    constructor(navCtrl: NavController, navParams: NavParams, menu: MenuController, alertCtrl: AlertController, appService: AppService);
    openChat(chat: DialogMsg): void;
    newIndividualChat(): void;
    newGroupChat(): void;
    seeGroupChat(): void;
    seePeopleChat(): void;
    games(): void;
    eventListPage(): void;
    settings(): void;
    devInfo(): void;
}
