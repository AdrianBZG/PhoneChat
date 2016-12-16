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
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
var serverURL = "http://localhost:8100/api";
var AppService = (function () {
    function AppService(storage) {
        this.storage = storage;
        var QBApp = {
            appId: 49438,
            authKey: 'Tq3NUcBPzPLV74F',
            authSecret: 'FQ5zcAqSN4mWBp5'
        };
        var config = {
            chatProtocol: {
                active: 2
            },
            debug: {
                mode: 0,
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
        var commands = {
            'hello': function () { console.log('Hello world!'); }
        };
        if (annyang) {
            annyang.addCommands(commands);
            annyang.start();
        }
        else {
            console.log("ERRORORO");
        }
    }
    AppService.prototype.getUserInfo = function (userId) {
        return Observable.create(function (observer) {
            QB.users.get(userId, function (err, result) {
                if (err) {
                    observer.next({
                        blob_id: 0,
                        created_at: "ErrorUser",
                        custom_data: null,
                        email: null,
                        external_user_id: null,
                        facebook_id: null,
                        full_name: null,
                        id: 0,
                        last_request_at: "ErrorUser",
                        login: "ErrorUser",
                        owner_id: 0,
                        phone: null,
                        twitter_digits_id: null,
                        twitter_id: null,
                        updated_at: "ErrorUser",
                        user_tags: null,
                        website: null
                    });
                }
                else {
                    observer.next(result);
                }
            });
        });
    };
    AppService.prototype.uploadBrocolitoPoint = function (points) {
        QB.users.update(this.userId, { custom_data: JSON.stringify({ points_brocolito: points }) }, function (err, result) {
            if (result) {
                console.log("Save points");
            }
            else {
                console.log("fail");
            }
        });
    };
    AppService.prototype.uploadFile = function (filePath) {
        var _this = this;
        return Observable.create(function (observer) {
            QB.content.createAndUpload({ file: filePath, 'public': false }, function (err, blob) {
                if (blob) {
                    QB.users.update(_this.userId, { blob_id: blob.id }, function (err, user) {
                        if (user) {
                            console.log(user);
                            observer.next(user);
                        }
                        else {
                            observer.error(err);
                        }
                    });
                }
                else {
                    observer.error(err);
                }
            });
            observer.complete();
        });
    };
    AppService.prototype.getPhoto = function (fileId) {
        return Observable.create(function (observer) {
            QB.content.getInfo(fileId, function (err, fileInfo) {
                if (fileInfo) {
                    QB.content.getFile(fileInfo.uid, function (err, file) {
                        if (file) {
                            observer.next(file);
                            console.log("GET PHOTO");
                            console.log(file);
                        }
                        else {
                            observer.error(err);
                            console.log(err);
                        }
                    });
                }
                else {
                    observer.error(err);
                    console.log(err);
                }
                observer.complete();
            });
        });
    };
    AppService.prototype.getURLImage = function (fileUID) {
        return QB.content.privateUrl(fileUID);
    };
    AppService.prototype.getGroupsDialogs = function () {
        var filters = null;
        return Observable.create(function (observer) {
            QB.chat.dialog.list(filters, function (err, resDialogs) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(resDialogs.items);
                }
                observer.complete();
            });
        });
    };
    AppService.prototype.setCurrentActiveChat = function (chat) {
        this.chat = chat;
    };
    AppService.prototype.connectToChat = function () {
        var _this = this;
        return Observable.create(function (observer) {
            QB.chat.connect({ userId: _this.userId, password: _this.password }, function (err, res) {
                console.log("LOGGUED");
                if (err) {
                    console.log("Ey a error");
                    console.log(err);
                    observer.error(err);
                }
                else {
                    console.log("YEs yse" + res);
                    console.log(res);
                    observer.next(res);
                }
                observer.complete();
            });
        });
    };
    AppService.prototype.disconnectChat = function () {
        QB.chat.disconnect();
    };
    AppService.prototype.unregister = function () {
        this.storage.clear();
    };
    AppService.prototype.setUserProperties = function (user, password, userId) {
        this.user = user;
        this.password = password;
        this.userId = userId;
        this.storage.set("user", user);
        this.storage.set("password", password);
        this.storage.set("userId", userId);
    };
    AppService.prototype.getRegisterAPI = function () {
        return serverURL + "/account/register";
    };
    AppService.prototype.getLoginURL = function () {
        return serverURL + "/account/logon";
    };
    AppService.prototype.getServerURL = function () {
        return serverURL;
    };
    AppService.prototype.startChat = function () {
        this.subscribeContactListener();
        this.subscribeDeliveredStatusListener();
        this.subscribeMessageListener();
        this.subscribeMessageTypingListener();
        this.subscribeReadStatusListener();
    };
    AppService.prototype.subscribeContactListener = function () {
        QB.chat.onContactListListener = function (userid, type) { };
    };
    AppService.prototype.subscribeDeliveredStatusListener = function () {
        QB.chat.onDeliveredStatusListener = function (messageId, dialogId, userId) {
        };
    };
    AppService.prototype.subscribeMessageListener = function () {
        QB.chat.onMessageListener = function (error, message) {
        };
    };
    AppService.prototype.subscribeMessageTypingListener = function () {
        QB.chat.onMessageTypingListener = function (isTyping, userId, dialogId) {
        };
    };
    AppService.prototype.subscribeReadStatusListener = function () {
        QB.chat.onReadStatusListener = function (messageId, dialogId, userId) {
        };
    };
    return AppService;
}());
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], AppService);
export { AppService };
