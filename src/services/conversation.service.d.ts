/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import { AppService } from "./app.service";
import { Observable } from "rxjs";
export interface MessageI {
    _id: string;
    created_at: string;
    updated_at: string;
    attachments: any[];
    read_ids: number[];
    delivered_ids: number[];
    chat_dialog_id: string;
    date_sent: number;
    message: string | null;
    recipient_id: string | null;
    sender_id: number;
    read: number;
}
export interface User {
    [userId: number]: {
        blob_id: number | null;
        created_at: string;
        custom_data: any;
        email: null | string;
        external_user_id: any;
        facebook_id: any;
        full_name: null;
        id: number;
        last_request_at: string;
        login: string;
        owner_id: number;
        phone: any;
        twitter_digits_id: any;
        twitter_id: any;
        updated_at: string;
        user_tags: any;
        website: any;
    };
}
export declare class ConversationService {
    private appService;
    users: User;
    constructor(appService: AppService);
    leave(): void;
    getListOfMessages(): Observable<MessageI>;
    registerNewMessages(fun: (dialog: any, msg: MessageI) => void): void;
    sendMessage(text: any, attachmentFileId?: any): {
        type: string;
        body: any;
        extension: {
            save_to_history: number;
        };
        markable: number;
    };
    getUser(userId: number): Observable<User>;
    mergeUsers(usersItems: any): void;
}
