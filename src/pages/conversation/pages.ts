import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, MenuController, Content, List, TextInput } from 'ionic-angular';

import { ConversationService, MessageI } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';

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

  title: String = "No title"
  lastMessages : ChatBubbleI[];

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public conversationService: ConversationService
    , public appService: AppService
  ) {
    menu.enable(true);
    // Update conversation with last messages
    conversationService.getListOfMessages()
      .then((messages) => {
        this.lastMessages = messages.map((msg) => 
          this.makeBubbleMsg(msg, appService.userId));
      });

    this.title = appService.chat.name;
    // this.conversationService.retrieveUsers();
    // Como inicialmente scrollToBottom??
    //setTimeout(() => {
    //  this.content.scrollToBottom();
    //}, 1000)

    conversationService.registerNewMessages((dialog, message) => {
      console.log("RegisterNewMessage");
      console.log(message); 
      this.lastMessages.push(this.makeBubbleMsg(message, appService.userId));
    })
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  ionViewWillLeave() {
    this.conversationService.leave();
  }

  sendMessage() {
    this.conversationService.sendMessage(this.inputMessage.value);
    // TODO: Make a temporal sending message 
/*    this.lastMessages.push(
      { content: msg.body as string
      , position: (this.appService.userId==msg.body.id ? 'left' : 'right')
      , time: ""
      , senderName: ""
      , img: "TODO:IMAGESOURCE"
      });
    this.updateScroll()
*/
  }

  getUserName(user) {
    console.log(user);
    return this.conversationService.getUserLoginById(user);
  }

  makeBubbleMsg(msg: MessageI, userId: number) {
    
    return { content: msg.message
           , position: msg.sender_id == userId? 'right' : ' left'
           , time: msg.created_at
           , senderName: "TODO:Name"
           , img: "http://ionicframework.com/img/docs/mcfly.jpg"
          };
  }
}
