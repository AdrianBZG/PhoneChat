import { NavController, NavParams, MenuController, Content, List, TextInput, Button } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import { ConversationService, MessageI } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';
import { ChatBubbleI } from '../chat-bubble/pages';
export declare class Conversation {
    navCtrl: NavController;
    navParams: NavParams;
    menu: MenuController;
    conversationService: ConversationService;
    appService: AppService;
    content: Content;
    listMessages: List;
    inputMessage: TextInput;
    sendBtn: Button;
    title: String;
    lastMessages: any;
    constructor(navCtrl: NavController, navParams: NavParams, menu: MenuController, conversationService: ConversationService, appService: AppService);
    ionViewDidEnter(): void;
    ionViewWillLeave(): void;
    eventSendMsg(): Observable<ChatBubbleI>;
    makeBubbleMsg(msg: MessageI, userInfo: any): ChatBubbleI;
}
