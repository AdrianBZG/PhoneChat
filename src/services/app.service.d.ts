/// <reference path="../../.vscode/typings/quickblox/quickblox.d.ts" />
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
export declare class AppService {
    private storage;
    user: string;
    userId: number;
    password: string;
    chat: DialogMsg;
    constructor(storage: Storage);
    getUserInfo(userId: number): Observable<any>;
    uploadBrocolitoPoint(points: number): void;
    uploadFile(filePath: any): Observable<any>;
    getPhoto(fileId: any): Observable<any>;
    getURLImage(fileUID: any): string;
    getGroupsDialogs(): Observable<DialogMsg[]>;
    setCurrentActiveChat(chat: any): void;
    connectToChat(): Observable<RosterMsg>;
    disconnectChat(): void;
    unregister(): void;
    setUserProperties(user: string, password: string, userId: number): void;
    getRegisterAPI(): string;
    getLoginURL(): string;
    getServerURL(): string;
    startChat(): void;
    subscribeContactListener(): void;
    subscribeDeliveredStatusListener(): void;
    subscribeMessageListener(): void;
    subscribeMessageTypingListener(): void;
    subscribeReadStatusListener(): void;
}
