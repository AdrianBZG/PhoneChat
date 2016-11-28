import { Component, ViewChild } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController, Content, List, TextInput } from 'ionic-angular';

import { ConversationService } from '../../services/conversation.service';

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
  lastMessages : any[];

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public conversationService: ConversationService
  ) {
    menu.enable(true);
    conversationService.getListOfMessages()
      .then((messages) => {
        this.lastMessages = messages;
      })

    // Como inicialmente scrollToBottom??
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000)

    this.conversationService.registerNewMessages((dialog, message) => {
      console.log(message);
      this.lastMessages.push(message);
    });
  };

  updateScroll() {
    this.content.scrollToBottom();
  }

  sendMessage() {
    console.log("Message sending")
    this.conversationService.sendMessage(this.inputMessage.value);
    console.log("Message send")
    this.updateScroll()
  }
}
