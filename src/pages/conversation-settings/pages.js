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
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ConversationService } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';
var ConversationSettings = (function () {
    function ConversationSettings(navCtrl, navParams, menu, conversationService, appService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.conversationService = conversationService;
        this.appService = appService;
        this.title = "No title";
        menu.enable(true);
    }
    ConversationSettings.prototype.ionViewDidEnter = function () {
    };
    ConversationSettings.prototype.ionViewWillLeave = function () {
    };
    ConversationSettings.prototype.changeGroupName = function (newName) {
        var params = { name: "My school friends" };
        QB.chat.dialog.update(this.appService.chat._id, params, function (err, response) {
        });
    };
    ConversationSettings.prototype.addPeople = function (uids) {
        var params = { push_all: { occupants_ids: uids } };
        QB.chat.dialog.update(this.appService.chat._id, params, function (err, response) {
        });
    };
    ConversationSettings.prototype.removePeople = function (uids) {
        var params = { pull_all: { occupants_ids: uids } };
        QB.chat.dialog.update(this.appService.chat._id, params, function (err, reponse) {
        });
    };
    return ConversationSettings;
}());
ConversationSettings = __decorate([
    Component({
        selector: 'conversation-settings',
        templateUrl: 'template.html',
        providers: [ConversationService],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        ConversationService,
        AppService])
], ConversationSettings);
export { ConversationSettings };
