/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import {Injectable} from "@angular/core";
import {AppService} from "./app.service";
import {Observable, BehaviorSubject} from "rxjs";
import {ChatBubbleI} from "../pages/chat-bubble/pages";
import {SensorsService} from "./sensors.service";

export interface MessageI {
    _id: string,
    created_at: Date,
    updated_at: string,
    attachments: any[],
    read_ids: number[],
    delivered_ids: number[],
    chat_dialog_id: string,
    date_sent: number,
    message: string | null,
    recipient_id: string | null,
    sender_id: number,
    read: number
}

export interface User {
    [userId: number]: {
        blob_id: number | null,
        created_at: string,
        custom_data: any,
        email: null | string,
        external_user_id: any,
        facebook_id: any,
        full_name: null
        id: number,
        last_request_at: string,
        login: string,
        owner_id: number,
        phone: any,
        twitter_digits_id: any,
        twitter_id: any,
        updated_at: string,
        user_tags: any,
        website: any
    }
}

@Injectable()
export class ConversationService {
    public messages: BehaviorSubject<ChatBubbleI[]> = new BehaviorSubject([]);
    public users: User = {};
    /**
     * ??
     */
    public userCityName: any;

    constructor(private appService: AppService,
                private sensorsService: SensorsService) {
        // Get user city name
        this.sensorsService.getCityName().then((response) => {
            if (response[0]) {
                this.userCityName = response[0].toString();
            }
        });



        QB.chat.muc.join(this.appService.chat.xmpp_room_jid, function (resultStanza) {
            let joined = true;

            for (let i = 0; i < resultStanza.childNodes.length; i++) {
                let elItem = resultStanza.childNodes.item(i);
                if (elItem.tagName === 'error') {
                    joined = false;
                }
            }
        });
        console.log("Joined to Chat");

        this.updateMessageList();
        this.listenNewMessages();
    }

    /**
     * Update message list from server
     *
     */
    updateMessageList() {
        let params = {chat_dialog_id: this.appService.chat._id, sort_asc: 'date_sent', limit: 100, skip: 0};

        QB.chat.message.list(params, (err, messages) => {
            if (err) {
                console.log("Get List of messages Error");
                console.log(err);
            }
            else {
                Promise.all(messages.items.map(msg =>
                    this.getUser(msg.sender_id).then(user => {
                        return this.makeBubbleMsg(msg, user);
                    }))).then((msgs: ChatBubbleI[]) => {
                        this.messages.next(this.messages.getValue().concat(msgs));
                });
            }
        });
    }

    /**
     * Keep listening messages of current dialog
     */
    listenNewMessages() {
        QB.chat.onMessageListener = ((userid, msg : MessageI) => {
            if (msg.chat_dialog_id === this.appService.chat._id) {
                this.getUser(userid).then(user =>
                    this.messages.next(this.messages.getValue().concat(this.makeBubbleMsg(msg, user)))
                )
            }
        });
    }

    /**
     * Leave chat to let to others know that no are "online"
     */
    leave() {
        QB.chat.muc.leave(this.appService.chat.xmpp_room_jid, (err, fine) => {
            console.log("Leave chat")
            if (err) {
                console.log("ON LEAVE CONVERSATION ERROR: ");
                console.log(err);
            }
        })
    }

    /**
     * Return all messages from opened chat in stream continuous
     */
    getListOfMessages(): Observable<MessageI> {
        let params = {chat_dialog_id: this.appService.chat._id, sort_asc: 'date_sent', limit: 100, skip: 0};

        return Observable.create((observer) => {
            QB.chat.message.list(params, (err, messages) => {
                if (err) {
                    console.log("Get List of messages Error");
                    console.log(err);
                    observer.error(err);
                }
                else {
                    for (let msg of messages.items) {
                        observer.next(msg);
                    }
                }
                observer.complete();
            });

        });
    }


    /**
     *
     * @param text
     * @param attachmentFileId
     * @returns {{type: (string|string), body: any, extension: {save_to_history: number}, markable: number}}
     */
    sendMessage(text, attachmentFileId?) {
        console.log("Sending message")
        console.log(text);
        /*
         QB.chat.onSentMessageCallback = function(messageLost, messageSent){
         console.group('onSentMessageCallback');
         messageLost ? console.log('Message was lost', messageLost) : console.log('Message was sent successfully', messageSent)
         console.groupEnd();
         };
         */

        let msg = {
            type: this.appService.chat.type === 3 ? 'chat' : 'groupchat',
            body: text,
            extension: {
                save_to_history: 1,
            },
            markable: 1
        };

        //if(attachmentFileId !== null){
        //    msg['extension']['attachments'] = [{id: attachmentFileId, type: 'photo'}];
        //}

        if (this.appService.chat.type === 3) {
            let opponentId = QB.chat.helpers.getRecipientId(this.appService.chat.occupants_ids, this.appService.userId);

            QB.chat.send(opponentId, msg);

            if (attachmentFileId === null) {
                return msg;
            } else {
                return msg // attachmentFileId;
            }
        } else {
            QB.chat.send(this.appService.chat.xmpp_room_jid, msg);
        }

        QB.chat.sendIsStopTypingStatus(this.appService.userId);
        return msg;
    }

    /**
     * Try get user from local list of user else fetch with server quickblox
     */
    getUser(userId: number): Promise<User> {
        return new Promise((resolve, reject) => {
            let user = this.users[userId];
            if (user) {
                resolve(user);
            }
            else {
                this.appService
                    .getUserInfo(userId)
                    .then(user => {
                        this.mergeUsers([user]);
                        this.appService.getPhoto(user.blob_id).subscribe(value => {
                            console.log(value)
                        });
                        resolve(user);
                    })
            }
        });
    }

    mergeUsers(usersItems) {
        let newUsers = {};
        for (let user of usersItems) {
            newUsers[user.id] = user;
        }
        Object.assign(this.users, newUsers);
    }

    makeBubbleMsg(msg: MessageI, userInfo: any): ChatBubbleI {
        return {
            content: msg.message
            , position: msg.sender_id == this.appService.userId ? 'right' : ' left'
            , time: msg.created_at
            , senderName: userInfo.login
            , //img: "http://ionicframework.com/img/docs/mcfly.jpg"
            img: "http://www.free-icons-download.net/images/user-icon-44709.png"
            , cityName: this.userCityName
        };
    }
}
