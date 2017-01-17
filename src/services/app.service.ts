/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import {Injectable} from "@angular/core";
import {NavController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {Settings} from "../pages/settings/pages";
import {EventList} from "../pages/event-list/pages";
import {Sensors} from "../pages/sensors/pages";
import {BrocolitoPage} from "../pages/brocolito-page/pages";
import {PeopleList} from "../pages/people-list/pages";
import {DevelopersPage} from "../pages/developers-page/pages";

declare var annyang;
declare var $;

//const serverURL = "http://localhost:8100/api";
const serverURL = "http://phonechat.herokuapp.com/api"; // Uncomment when build to android

@Injectable()
export class AppService {
    // Indentification of user logued
    public user: string;
    public userId: number;
    public password: string;
    public chat: DialogMsg;
    public userIp: any;

    constructor(private storage: Storage
              , public navCtrl: NavController
              ) {
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


        let commands = {
            'show brocolito': function () {
                this.navCtrl.push(BrocolitoPage);
            },
            'show developers': function () {
                this.navCtrl.push(DevelopersPage);
            },
            'show events': function () {
                this.navCtrl.push(EventList)
            },
            'show session': function () {
                this.navCtrl.push(Settings);
            },
            'show people': function () {
               this.navCtrl.push(PeopleList)
            },
            'show sensors': function () {
               this.navCtrl.push(Sensors)
            },
            'invite friends': function () {
                // TODO: DO it
                //$('#showMenuBtn').click();
            }
        };

        if (annyang) {
            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start();
        }
        else {
            console.log("Voice fail");

        }

        $.get("http://ipinfo.io", function (response) {
            this.userIp = response.ip;
            console.log('IP obtained');
            console.log(this.userIp);
        }, "jsonp");
    }


    /**
     * Get user Info from id
     */
    getUserInfo(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            QB.users.get(userId, (err, result) => {
                if (err) {
                    //observer.error(err)
                    resolve({
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
                    })
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Brocolito user puntuation upload
     */
    uploadBrocolitoPoint(points: number) {
        QB.users.update(this.userId, {custom_data: JSON.stringify({points_brocolito: points})}, (err, result) => {
            if (result) {
                console.log("Save points");
            }
            else {
                console.log("fail");
            }
        });
    }

    /**
     * Upload files
     */
    uploadFile(filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            QB.content.createAndUpload({file: filePath, 'public': false}, (err, blob) => {
                if (blob) {
                    QB.users.update(this.userId, {blob_id: blob.id}, (err, user) => {
                        if (user) {
                            console.log(user);
                            resolve(user);
                        }
                        else {
                            reject(err);
                        }
                    })
                }
                else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get file photo
     */
    getPhoto(fileId): Observable<any> {
        return Observable.create((observer) => {
            QB.content.getInfo(fileId, (err, fileInfo) => {
                if (fileInfo) {
                    QB.content.getFile(fileInfo.uid, (err, file) => {
                        if (file) {
                            observer.next(file);
                            console.log("GET PHOTO");
                            console.log(file);
                        }
                        else {
                            observer.error(err);
                            console.log(err);
                        }
                    })
                }
                else {
                    observer.error(err);
                    console.log(err);
                }
                observer.complete();
            });
        });
    }

    /**
     * Get URL to content from uid
     */
    getURLImage(fileUID): string {
        return QB.content.privateUrl(fileUID);
    }

    /**
     * Return a Promise of list of dialogs
     */
    getGroupsDialogs(): Observable<DialogMsg[]> {
        // https://quickblox.com/developers/Web_XMPP_Chat_Sample#Dialogs
        let filters = null;
        // return this.makeObservable((callback) =>
        //   QB.chat.dialog.list(filters, callback)
        // ).map((value) => { return value.items as DialogMsg[];});
        return Observable.create((observer) => {
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

    setCurrentActiveChat(chat: any) {
        this.chat = chat;
    }

    /**
     * Connect to chat
     */
    connectToChat(): Observable<RosterMsg> {
        return Observable.create((observer) => {
            QB.chat.connect({userId: this.userId, password: this.password}, (err, res) => {
                console.log("LOGGUED");

                if (err) {
                    console.log("Ey a error")
                    console.log(err);

                    observer.error(err);
                }
                else {
                    console.log("YEs yse" + res)
                    console.log(res);

                    observer.next(res);
                }
                observer.complete();
            })

        });
    }

    disconnectChat() {
        QB.chat.disconnect();
    }

    unregister() {
        this.storage.clear();
    }

    setUserProperties(user: string, password: string, userId: number) {
        this.user = user;
        this.password = password;
        this.userId = userId;
        this.storage.set("user", user);
        this.storage.set("password", password);
        this.storage.set("userId", userId);
    }

    setPrivacyGeolocationProperty(value: number) {
        this.storage.set("privacyGeolocationProperty", value);
    }

    getPrivacyGetlocationProperty() {
        return this.storage.get("privacyGeolocationProperty");
    }

    getRegisterAPI() {
        return serverURL + "/account/register";
    }

    getAddEventAPI() {
        return serverURL + "/event/addEvent";
    }

    getEventListURL() {
        return serverURL + "/event/getEvents";
    }

    getLoginURL() {
        return serverURL + "/account/logon";
    }

    getServerURL() {
        return serverURL;
    }

    hashCodeString(value: string): string {
        return value.split("").reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }
            , 0).toString();
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
        QB.chat.onContactListListener = (userid, type) => {
        };
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

    commaSeparatedStringToIntArray(value: string) {
        var intArray = [];
        value.split(',').forEach(function (element) {
            intArray.push(element);
        });
        return intArray;
    }
}
