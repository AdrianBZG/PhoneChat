import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, List, TextInput, Button, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';

import { ConversationService, MessageI } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';
import { SensorsService } from '../../services/sensors.service';

import { ChatBubbleI } from '../chat-bubble/pages';


@Component({
  selector: 'conversation',
  templateUrl: 'template.html',
  providers: [ ConversationService ],
})
export class Conversation {
  @ViewChild(Content) content: Content;
  @ViewChild(List) listMessages: List;
  @ViewChild(TextInput) inputMessage : TextInput;
  @ViewChild(Button) sendBtn : Button;

  title: String = ""
  lastMessages ; //: Observable<ChatBubbleI[]>;
  userCityName: any;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public conversationService: ConversationService
    , public appService: AppService
    , public popoverCtrl: PopoverController
    , public sensorsService : SensorsService
  ) {

  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
    // Get user city name
    this.sensorsService.getCityName().then((response) => {
      this.userCityName = response[0].toString();
    });

    // Update conversation with last messages
    this.lastMessages =
      this.conversationService.getListOfMessages()
        .concatMap((msg) => {
          return this.conversationService
                     .getUser(msg.sender_id).take(1)
                     .map((v) => {return {msg: msg, user: v}});
        })
        .map((data) => {return this.makeBubbleMsg(data.msg, data.user)})
        .merge(this.eventSendMsg())
        .scan((acc, value, index) => {
          acc.push(value);
          this.content.scrollToBottom();
          return acc}, []);

    this.lastMessages
        .subscribe(
          (value) => {
            //console.log("SEE NEW VALUE")
          },
          (error) => {
            console.log("ERROR");
            console.log(error);
          },
          () => {
            console.log("COMPLETE");
          }
        );

    this.title = this.appService.chat.name;
  }

  ionViewWillLeave() {
    this.conversationService.leave();
  }

  presentPopover(myEvent) {
    //let popover = this.popoverCtrl.create(PopoverPage);
    //popover.present({
    //  ev: myEvent
    //});
  }


  /**
   * Get events of send button click and input enter event to produce a message stream
   */
  eventSendMsg(): Observable<ChatBubbleI> {
    let btnEvents = Observable.fromEvent(this.sendBtn.getNativeElement(), 'click')
                        .map(_ => console.log("PUTIO VLCIJ")); // TODO: Click del mouse

    let inputEvents = Observable.fromEvent(this.inputMessage.getNativeElement(), 'keyup')
                        .filter((key: KeyboardEvent) => key.keyCode == 13 && this.inputMessage.value != "");

    //console.log(this.appService.getPhoto(this.conversationService.getUser(this.appService.userId).blob_id));
    return btnEvents.merge(inputEvents).map((ev:any) => {
      let bodyMsg = this.inputMessage.value;
      let dateValue = new Date();
      this.inputMessage.setValue("");
      this.conversationService.sendMessage(bodyMsg);

      return { content: bodyMsg as string
             , position: 'right'
             , time: dateValue
             , senderName: this.appService.user
             , img: "http://www.free-icons-download.net/images/user-icon-44709.png"
             , cityName: this.userCityName
             }
    });
  }

  makeBubbleMsg(msg: MessageI, userInfo: any): ChatBubbleI {
    //console.log(this.appService.getPhoto(this.conversationService.getUser(userId).blob_id));
    return { content: msg.message
           , position: msg.sender_id == this.appService.userId? 'right' : ' left'
           , time: msg.created_at
           , senderName: userInfo.login
           , //img: "http://ionicframework.com/img/docs/mcfly.jpg"
           img: "http://www.free-icons-download.net/images/user-icon-44709.png"
           , cityName: this.userCityName
          };
  }
}
