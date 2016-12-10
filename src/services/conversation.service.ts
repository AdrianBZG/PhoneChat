/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import { Injectable } from "@angular/core";
import { AppService } from "./app.service";
import { Observable } from "rxjs";

export interface MessageI {
  _id: string,
  created_at: string,
  updated_at: string,
  attachments: any[],
  read_ids: number[],
  delivered_ids: number[],
  chat_dialog_id: string,
  date_sent: number,
  message: string | null,
  recipient_id: string | null,
  sender_id: number,
  read: number
}

export interface User {
  [userId: number] : {
    blob_id: number | null,
    created_at: string,
    custom_data: any,
    email: null | string,
    external_user_id: any,
    facebook_id: any,
    full_name: null
    id: number,
    last_request_at: string,
    login: string,
    owner_id: number,
    phone: any,
    twitter_digits_id: any,
    twitter_id: any,
    updated_at: string,
    user_tags: any,
    website: any
  }
}

@Injectable()
export class ConversationService {
  public users: User = {};

  constructor(
    private appService : AppService
  ) {
    console.log(this.appService.chat);
    QB.chat.muc.join(this.appService.chat.xmpp_room_jid, function(resultStanza) {
      console.log(resultStanza);
      var joined = true;

      for (var i = 0; i < resultStanza.childNodes.length; i++) {
        var elItem = resultStanza.childNodes.item(i);
        if (elItem.tagName === 'error'){
          joined = false;
        }
      }
    });
    console.log("BUILD");
  }

  /**
   * Leave chat to let to others know that no are "online"
   */
  leave() {
    QB.chat.muc.leave(this.appService.chat.xmpp_room_jid, (err, fine) => {
      if (err) {
        console.log("ON LEAVE CONVERSATION ERROR: ");
        console.log(err);
      }
    })
  }

  /**
   * Return all messages from opened chat in stream continous
   */
  getListOfMessages() : Observable<MessageI> {
    let params = { chat_dialog_id: this.appService.chat._id, sort_asc: 'date_sent', limit: 100, skip: 0};

    return Observable.create((observer) => {
      QB.chat.message.list(params, (err, messages) => {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        else {
          for (let msg of messages.items) {
            observer.next(msg);
          }
        }
      });
      // Keep listening messages
      QB.chat.onMessageListener = ((err, msg) => {
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(msg);
        }
      });
    });
  }

  registerNewMessages(fun : (dialog: any, msg : MessageI) => void) {
    QB.chat.onMessageListener = fun;
  }


  sendMessage(text, attachmentFileId?) {
    QB.chat.onSentMessageCallback = function(messageLost, messageSent){
       console.group('onSentMessageCallback');
           messageLost ? console.log('Message was lost', messageLost) : console.log('Message was sent successfully', messageSent)
       console.groupEnd();
    };
    //stickerpipe.onUserMessageSent(stickerpipe.isSticker(text));

    let msg = {
        type: this.appService.chat.type === 3 ? 'chat' : 'groupchat',
        body: text,
        extension: {
            save_to_history: 1,
        },
        markable: 1
    };

    //if(attachmentFileId !== null){
    //    msg['extension']['attachments'] = [{id: attachmentFileId, type: 'photo'}];
    //}

    if (this.appService.chat.type === 3) {
        let opponentId = QB.chat.helpers.getRecipientId(this.appService.chat.occupants_ids, this.appService.userId);

        QB.chat.send(opponentId, msg);

        //$('.list-group-item.active .list-group-item-text')
        //    .text(stickerpipe.isSticker(msg.body) ? 'Sticker' : msg.body);

        if(attachmentFileId === null){
          return msg;
        } else {
          return msg // attachmentFileId;
        }
    } else {
        QB.chat.send(this.appService.chat.xmpp_room_jid, msg);
    }

    QB.chat.sendIsStopTypingStatus(this.appService.userId);
    return msg;
  }

  /**
   * Try get user from local list of user else fetch with server quickblox
   */
  getUser(userId: number): Observable<User> {
    let user = this.users[userId];
    if (user) {
      return Observable.of(user);
    }
    else {
      return this.appService
        .getUserInfo(userId)
        .map((user) => {
          this.mergeUsers([user]);
          return user;
      });
    }
  }

  mergeUsers(usersItems){
    var newUsers = {};
    for (let user of usersItems) {
      newUsers[user.id] = user;
    }
    Object.assign(this.users, newUsers);
  }
}
