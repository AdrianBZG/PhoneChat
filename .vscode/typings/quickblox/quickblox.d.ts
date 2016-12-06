
interface QuickBloxStatic {
    createSession(appIdOrToken: string, callback : (error, session) => void): void;
    destroySession(callback: (error, session) => void): void;
    getSession(callback: (error, session) => void): void;
    init(appIdOrToken: number | string, authKeyOrAppId: string | number, authSecret : string, configMap: {});
    login(params, callback);
    logout(callback);

    chat: Chat;
    users: Users;
    content: Content;
}

interface Content {
    create(params, callback);
    list(params, callback);
    delete(id, callback);
    createAndUpload(params, callback);
    upload(params, callback);
    taggedForCurrentUser(callback);
    markUploaded(params, callback);
    getInfo(id, callback);
    getFile(uid, callback);
    getFileUrl(id, callback);
    update(params, callback);
    privateUrl(fileUID);
    publicUrl(fileUID);
}

interface Users {
    listUsers(params, callback);
    /**
     * params is required object!!! If you want to get users without any parameters, set empty object as the parameter.
     */
    get(params, callback);
    create(params, callback);
    update(id, params, callback);
    delete(params, callback);
    resetPassword(email, callback)
}

interface Chat {
    connect(params, callback: (err, resp: RosterMsg) => void);
    disconnect();
    onConfirmSubscribeListener(userId);
    onContactListListener(userId, type);
    onDeliveredStatusListener(messageId, dialogId, userId);
    onDisconnectedListener();
    onMessageErrorListener(error, message);
    onMessageListener(error, message);
    onMessageTypingListener(isTyping, userId, dialogId);
    onReadStatusListener(messageId, dialogId, userId);
    onReconnectListener();
    onRejectSubscribeListener(userId);
    onSentMessageCallback(error, message);
    onSubscribeListener(userId);
    onSystemMessageListener(receivedMessage);
    send(jid_or_user_id, message): string;
    sendIsStopTypingStatus(jid_or_user_id);
    sendIsTypingStatus(jid_or_user_id);
    sendReadStatus(params);
    sendSystemMessage(jid_or_user_id, message): string;

    dialog: Dialog;
    message: Message;
    muc: Muc;
    roster: Roster;
    helpers: Helpers;
}

interface Helpers {
    typeChat(jid_or_user_id) 
    getRecipientId(occupantsIds, UserId);
    getUserJid(userId, appId);
    getUserNickWithMucDomain(userId);
    getIdFromNode(jid);
    getDialogIdFromNode(jid);
    getRoomJidFromDialogId(dialogId);
    getRoomJid(jid);
    getIdFromResource(jid);
    getBsonObjectId();
    getUserIdFromRoomJid(jid);
}

interface RosterMsg {
    [userid: number] : {subscription: string, ask: null | string }; 
}

interface Dialog {
    create(params, callback);
    list(params, callback)
    update(id, params, callback);
    delete(id, params_or_callback, callback)
}

interface DialogMsg {
  _id : string,
  created_at: string,  // date
  updated_at: string,  // date
  last_message : string,
  last_message_date_sent : number, // in milisecons?
  last_message_user_id : number,  // user id
  name : string | null,  
  photo : string | null,
  occupants_ids : number[],
  type : number,
  unread_messages_count: number,
  xmpp_room_jid: string | null
}

interface Message {
    list(params, callback);
    create(params, callback);
    update(id, params, callback);
    delete(id, params, callback);
    unreadCount(params, callback);
}

interface Muc {
    join(jid, callback);
    leave(jid, callback);
    listOnlineUsers(dialogId, callback);

}

interface Roster {
    add(jidOrUserId, callback);
    confirm(jidOrUserId, callback);
    get(callback);
    reject(jidOrUserId, callback);
    remove(jidOrUserId, callback);
}

declare module "quickblox" {
    export = QB;
}
declare var QB: QuickBloxStatic