import { Component } from '@angular/core';

import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';

import { Conversation } from '../conversation/pages';
import { Settings } from '../settings/pages';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'chat',
  templateUrl: 'template.html',
})
export class Chat {
  user: String = ""
  topicChats : DialogMsg[] = [];
  
  /**
   * This class controll the diferents chat that an user can access.
   */
  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public alertCtrl: AlertController
    , public appService: AppService) {

    this.user = appService.user;
    menu.enable(true);

    this.appService
      .getGroupsDialogs()
      .subscribe(
        (dialogs) => { 
          this.topicChats = dialogs.map((dialog) => {
            dialog.photo = this.appService.getURLImage(dialog.photo);
            return dialog;
          });
        },
        (error) => {
          console.log("ERROR ON LOAD DIALOGS:");
          console.log(error);
          this.navCtrl.pop();
        }
      )
  };

  /**
   * Push new screen with chat selected
   */
  openChat(chat : DialogMsg) {
    this.appService.setCurrentActiveChat(chat);
    this.navCtrl.push(Conversation);
  }

  /**
   * Chat with a specific person in your list of contacts?
   * TODO: This need a some
   */
  newIndividualChat() {

    let prompt = this.alertCtrl.create({
      title: 'Chat with',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  newGroupChat() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Group',
      message: "Enter a name for this Group",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Creating Group Chat');
          }
        }
      ]
    });
    prompt.present();
  }

  seeGroupChat() {
    // TODO: Filter topicChats to groups only
  }

  seePeopleChat() {
    // TODO: Filter to person to person chats
  }

  games() {
    console.log("HERE Rudolf's game // it could be access from chat")
  }


  /**
   * Go to settings page 
   */
  settings() {
    this.navCtrl.push(Settings);
  }

  devInfo() {
    // TODO: Show info about ourself and github project location
  }
}
