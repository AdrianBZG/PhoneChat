import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

declare var QB;

const serverURL = "http://localhost:8100/api";

@Injectable()
export class AppService {
  // Indentification of user logued
  public user : string;
  public userId : number;
  public password : string;
  public chat : any;


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

  /// Return a Promise of list of dialogs
  getGroupsDialogs() : Promise<any[]> {
    return new Promise((resolve, reject) => {
      // https://quickblox.com/developers/Web_XMPP_Chat_Sample#Dialogs
      let filters = null;
      QB.chat.dialog.list(filters, (err, resDialogs : any) => {
        if (err) {
          reject(err);
        } else {
          resolve(resDialogs.items);
        }
      });
    })
  }

  setCurrentActiveChat(chat : any) {
    this.chat = chat;
  }

  connectToChat() {
    console.log("User ID CHAT" + this.userId)
    QB.chat.connect({userId: this.userId, password: this.password },
      (err, roster) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(roster);
        }

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

}
