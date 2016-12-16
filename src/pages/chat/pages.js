var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, MenuController } from 'ionic-angular';
import { Conversation } from '../conversation/pages';
import { Settings } from '../settings/pages';
import { Sensors } from '../sensors/pages';
import { AppService } from '../../services/app.service';
var Chat = (function () {
    function Chat(navCtrl, navParams, menu, alertCtrl, appService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.user = "";
        this.topicChats = [];
        this.user = appService.user;
        menu.enable(true);
        this.appService
            .getGroupsDialogs()
            .subscribe(function (dialogs) {
            _this.topicChats = dialogs.map(function (dialog) {
                dialog.photo = _this.appService.getURLImage(dialog.photo);
                return dialog;
            });
        }, function (error) {
            console.log("ERROR ON LOAD DIALOGS:");
            console.log(error);
            _this.navCtrl.pop();
        });
    }
    ;
    Chat.prototype.openChat = function (chat) {
        this.appService.setCurrentActiveChat(chat);
        this.navCtrl.push(Conversation);
    };
    Chat.prototype.newIndividualChat = function () {
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    Chat.prototype.newGroupChat = function () {
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Create',
                    handler: function (data) {
                        console.log('Creating Group Chat');
                    }
                }
            ]
        });
        prompt.present();
    };
    Chat.prototype.seeGroupChat = function () {
    };
    Chat.prototype.seePeopleChat = function () {
    };
    Chat.prototype.games = function () {
        console.log("HERE Rudolf's game // it could be access from chat");
    };
    Chat.prototype.eventListPage = function () {
        this.navCtrl.push(Sensors);
    };
    Chat.prototype.settings = function () {
        this.navCtrl.push(Settings);
    };
    Chat.prototype.devInfo = function () {
    };
    return Chat;
}());
Chat = __decorate([
    Component({
        selector: 'chat',
        templateUrl: 'template.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        AlertController,
        AppService])
], Chat);
export { Chat };
