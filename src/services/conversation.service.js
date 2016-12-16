var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { AppService } from "./app.service";
import { Observable } from "rxjs";
var ConversationService = (function () {
    function ConversationService(appService) {
        this.appService = appService;
        this.users = {};
        console.log(this.appService.chat);
        QB.chat.muc.join(this.appService.chat.xmpp_room_jid, function (resultStanza) {
            console.log(resultStanza);
            var joined = true;
            for (var i = 0; i < resultStanza.childNodes.length; i++) {
                var elItem = resultStanza.childNodes.item(i);
                if (elItem.tagName === 'error') {
                    joined = false;
                }
            }
        });
        console.log("BUILD");
    }
    ConversationService.prototype.leave = function () {
        QB.chat.muc.leave(this.appService.chat.xmpp_room_jid, function (err, fine) {
            if (err) {
                console.log("ON LEAVE CONVERSATION ERROR: ");
                console.log(err);
            }
        });
    };
    ConversationService.prototype.getListOfMessages = function () {
        var params = { chat_dialog_id: this.appService.chat._id, sort_asc: 'date_sent', limit: 100, skip: 0 };
        return Observable.create(function (observer) {
            QB.chat.message.list(params, function (err, messages) {
                if (err) {
                    console.log(err);
                    observer.error(err);
                }
                else {
                    for (var _i = 0, _a = messages.items; _i < _a.length; _i++) {
                        var msg = _a[_i];
                        observer.next(msg);
                    }
                }
            });
            QB.chat.onMessageListener = (function (err, msg) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(msg);
                }
            });
        });
    };
    ConversationService.prototype.registerNewMessages = function (fun) {
        QB.chat.onMessageListener = fun;
    };
    ConversationService.prototype.sendMessage = function (text, attachmentFileId) {
        QB.chat.onSentMessageCallback = function (messageLost, messageSent) {
            console.group('onSentMessageCallback');
            messageLost ? console.log('Message was lost', messageLost) : console.log('Message was sent successfully', messageSent);
            console.groupEnd();
        };
        var msg = {
            type: this.appService.chat.type === 3 ? 'chat' : 'groupchat',
            body: text,
            extension: {
                save_to_history: 1,
            },
            markable: 1
        };
        if (this.appService.chat.type === 3) {
            var opponentId = QB.chat.helpers.getRecipientId(this.appService.chat.occupants_ids, this.appService.userId);
            QB.chat.send(opponentId, msg);
            if (attachmentFileId === null) {
                return msg;
            }
            else {
                return msg;
            }
        }
        else {
            QB.chat.send(this.appService.chat.xmpp_room_jid, msg);
        }
        QB.chat.sendIsStopTypingStatus(this.appService.userId);
        return msg;
    };
    ConversationService.prototype.getUser = function (userId) {
        var _this = this;
        var user = this.users[userId];
        if (user) {
            return Observable.of(user);
        }
        else {
            return this.appService
                .getUserInfo(userId)
                .map(function (user) {
                _this.mergeUsers([user]);
                return user;
            });
        }
    };
    ConversationService.prototype.mergeUsers = function (usersItems) {
        var newUsers = {};
        for (var _i = 0, usersItems_1 = usersItems; _i < usersItems_1.length; _i++) {
            var user = usersItems_1[_i];
            newUsers[user.id] = user;
        }
        Object.assign(this.users, newUsers);
    };
    return ConversationService;
}());
ConversationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppService])
], ConversationService);
export { ConversationService };
