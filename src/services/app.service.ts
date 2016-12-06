/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


const serverURL = "http://localhost:8100/api";

@Injectable()
export class AppService {
  // Indentification of user logued
  public user : string;
  public userId : number;
  public password : string;
  public chat : DialogMsg;

  constructor(private storage : Storage) {
    // QB Initialization
    let QBApp = {
      appId: 49438,
      authKey: 'Tq3NUcBPzPLV74F',
      authSecret: 'FQ5zcAqSN4mWBp5'
    };

    let config = {
      chatProtocol: {
        active: 2
      },
      debug: {
        mode: 1,
        file: null
      },
      stickerpipe: {
        elId: 'stickers_btn',

        apiKey: '847b82c49db21ecec88c510e377b452c',

        enableEmojiTab: false,
        enableHistoryTab: true,
        enableStoreTab: false,

        userId: null
      }
    };
    QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, config);

  }

  /**
   * Return a Promise of list of dialogs
   */
  getGroupsDialogs(): Observable<DialogMsg[]> {
    return Observable.create((observer) => {
      // https://quickblox.com/developers/Web_XMPP_Chat_Sample#Dialogs
      let filters = null;
      QB.chat.dialog.list(filters, (err, resDialogs) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resDialogs.items as DialogMsg[]);
        }
        observer.complete();
      });
    })
  }

  setCurrentActiveChat(chat : any) {
    this.chat = chat;
  }

  /**
   * Connect to chat
   */
  connectToChat(): Observable<RosterMsg> {
    return Observable.create((observer) => {
      QB.chat.connect({userId: this.userId, password: this.password },
        (err, roster) => {
          if (err) {
            observer.error(err);
          }
          else {
            observer.next(roster);
          }
          observer.complete();
        });
    });
  }

  disconnectChat() {
    QB.chat.disconnect();
  }

  unregister() {
    this.storage.clear();
  }

  setUserProperties(user : string, password : string, userId : number) {
    this.user = user;
    this.password = password;
    this.userId = userId;
    this.storage.set("user", user);
    this.storage.set("password", password);
    this.storage.set("userId", userId);
  }

  getRegisterAPI() {
    return serverURL + "/account/register";
  }

  getLoginURL() {
    return serverURL + "/account/logon";
  }

  getServerURL() {
    return serverURL;
  }

  startChat() {
    this.subscribeContactListener();
    this.subscribeDeliveredStatusListener();
    this.subscribeMessageListener();
    this.subscribeMessageTypingListener();
    this.subscribeReadStatusListener();
  }

  /**
   * Recieve status of users in personal contact list
   */
  subscribeContactListener() {
    QB.chat.onContactListListener = (userid, type) => {};
  }

  /**
   * Is received your message in dialog, by userid
   * 
   */
  subscribeDeliveredStatusListener() {
    QB.chat.onDeliveredStatusListener = (messageId, dialogId, userId) => {

    };
  }

  /**
   * Receive a message
   */
  subscribeMessageListener() {
    QB.chat.onMessageListener = (error, message) => {

    };
  }

  /**
   * User is typing in dialog
   */
  subscribeMessageTypingListener() {
    QB.chat.onMessageTypingListener = (isTyping, userId, dialogId) => {

    };
  }

  /**
   * Notify on user read message
   * The message should have markable option
   * https://quickblox.com/developers/Web_XMPP_Chat_Sample#Read_status
   */
  subscribeReadStatusListener() {
    QB.chat.onReadStatusListener = (messageId, dialogId, userId) => {

    };
  }
}
