import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

declare var QB;

const serverURL = "http://localhost:8100/api";

@Injectable()
export class AppService {
  // Indentification of user logued
  public user : string;
  public password : string;


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

  setUserAndPassword(user : string, password : string) {
    this.user = user;
    this.password = password;
    this.storage.set("user", user);
    this.storage.set("password", password);
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
