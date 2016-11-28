import { Component, Output, EventEmitter } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'conversation',
  templateUrl: 'template.html',
  providers: [ ConversationService ]
})
export class Conversation {
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
  };

  updateListOfMessages() {
    // TODO:
  }

  sendMessage() {
    //TODO:
  }
}
