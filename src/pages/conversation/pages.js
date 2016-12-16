var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Content, List, TextInput, Button } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import { ConversationService } from '../../services/conversation.service';
import { AppService } from '../../services/app.service';
var Conversation = (function () {
    function Conversation(navCtrl, navParams, menu, conversationService, appService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.conversationService = conversationService;
        this.appService = appService;
        this.title = "";
        menu.enable(true);
    }
    Conversation.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.content.scrollToBottom();
        this.lastMessages =
            this.conversationService.getListOfMessages()
                .concatMap(function (msg) {
                return _this.conversationService
                    .getUser(msg.sender_id).take(1)
                    .map(function (v) { return { msg: msg, user: v }; });
            })
                .map(function (data) { return _this.makeBubbleMsg(data.msg, data.user); })
                .merge(this.eventSendMsg())
                .scan(function (acc, value, index) {
                acc.push(value);
                _this.content.scrollToBottom();
                return acc;
            }, []);
        this.lastMessages
            .subscribe(function (value) {
            console.log("SEE NEW VALUE");
        }, function (error) {
            console.log("ERRORO");
            console.log(error);
        }, function () {
            console.log("COMPLETE");
        });
        this.title = this.appService.chat.name;
    };
    Conversation.prototype.ionViewWillLeave = function () {
        this.conversationService.leave();
    };
    Conversation.prototype.eventSendMsg = function () {
        var _this = this;
        var btnEvents = Observable.fromEvent(this.sendBtn.getNativeElement(), 'click')
            .map(function (_) { return console.log("PUTIO VLCIJ"); });
        var inputEvents = Observable.fromEvent(this.inputMessage.getNativeElement(), 'keyup')
            .filter(function (key) { return key.keyCode == 13 && _this.inputMessage.value != ""; });
        return btnEvents.merge(inputEvents).map(function (ev) {
            var bodyMsg = _this.inputMessage.value;
            _this.inputMessage.setValue("");
            _this.conversationService.sendMessage(bodyMsg);
            return { content: bodyMsg,
                position: 'right',
                time: new Date().toString(),
                senderName: _this.appService.user,
                img: "http://ionicframework.com/img/docs/mcfly.jpg"
            };
        });
    };
    Conversation.prototype.makeBubbleMsg = function (msg, userInfo) {
        return { content: msg.message,
            position: msg.sender_id == this.appService.userId ? 'right' : ' left',
            time: msg.created_at,
            senderName: userInfo.login,
            img: "http://ionicframework.com/img/docs/mcfly.jpg"
        };
    };
    return Conversation;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], Conversation.prototype, "content", void 0);
__decorate([
    ViewChild(List),
    __metadata("design:type", List)
], Conversation.prototype, "listMessages", void 0);
__decorate([
    ViewChild(TextInput),
    __metadata("design:type", TextInput)
], Conversation.prototype, "inputMessage", void 0);
__decorate([
    ViewChild(Button),
    __metadata("design:type", Button)
], Conversation.prototype, "sendBtn", void 0);
Conversation = __decorate([
    Component({
        selector: 'conversation',
        templateUrl: 'template.html',
        providers: [ConversationService],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        ConversationService,
        AppService])
], Conversation);
export { Conversation };
