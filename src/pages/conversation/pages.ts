import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, MenuController, Content, List, TextInput } from 'ionic-angular';

import { ConversationService } from '../../services/conversation.service';
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
        console.log(messages);
        let newMessages = messages.map((msg) => {
          return { content: msg.message
          , position: msg.sender_id==this.appService.userId? 'right' : ' left'
          , time: msg.created_at
          , senderName: "TODO:Name"
          , img: "TODO:Image Source"
          };});
        this.lastMessages = newMessages;
      });
      
    this.title = this.appService.chat.name;

    // this.conversationService.retrieveUsers();
    // Como inicialmente scrollToBottom??
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000)

    this.conversationService.registerNewMessages((dialog, message) => {
      console.log(message);
      // TODO: see new message definition
      this.lastMessages.push(message);
    });
  };

  updateScroll() {
    this.content.scrollToBottom();
  }

  sendMessage() {
    let msg = this.conversationService.sendMessage(this.inputMessage.value);
    this.lastMessages.push(
      { content: msg.body as string
      , position: (this.appService.userId==msg.body.id ? 'left' : 'right')
      , time: ""
      , senderName: ""
      , img: "TODO:IMAGESOURCE"
      });

    this.updateScroll()
  }

  getUserName(user) {
    console.log(user);
    return this.conversationService.getUserLoginById(user);
  }
}
