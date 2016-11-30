import { Injectable } from "@angular/core";
import { AppService } from "./app.service";

declare var QB;

@Injectable()
export class ConversationService {
  public users : any[];

  usersForDialogCreationStats = {currentPage: 0,
                              retrievedCount: 0,
                              totalEntries: null};

  usersForDialogUpdateStats = {currentPage: 0,
                            retrievedCount: 0,
                            totalEntries: null};
  constructor(
    private appService : AppService
  ) {}

  /// Return messages from current chat (locate in appService)
  getListOfMessages() : Promise<any[]> {
    // TODO: Adjust params, it should only download new messages.
    let params = { chat_dialog_id: this.appService.chat._id, sort_desc: 'date_sent', limit: 100, skip: 0};
    return new Promise((resolve, reject) => {
      QB.chat.message.list(params, (err, messages) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          resolve(messages.items);
        }
      });
    });
  }

  registerNewMessages(fun : (dialog: any, msg : any) => void) {
    QB.chat.onMessageListener = fun;
  }

  sendMessage(text : string, attachmentFileId? : string) {

    // stickerpipe.onUserMessageSent(stickerpipe.isSticker(text));

    console.log(this.appService.chat);
    var msg = {
      type: this.appService.chat.type ===  3? 'chat' : 'groupchat',
      body: text,
      extension: {
        save_to_history: 1,
      },
      senderId: this.appService.userId,
      markable: 1
    };
    if(attachmentFileId != null){
      msg["extension"]["attachments"] = [{id: attachmentFileId, type: 'photo'}];
    }

      //$('.list-group-item.active .list-group-item-text').text(stickerpipe.isSticker(msg.body) ? 'Sticker' : msg.body);

    if(attachmentFileId === null){
      //showMessage(currentUser.id, msg);
    } else {
      //showMessage(currentUser.id, msg, attachmentFileId);
    }
    // TODO Group error
    QB.chat.send(this.appService.chat.xmpp_room_jid, msg);

    // claer timer and send 'stop typing' status
    //clearTimeout(isTypingTimerId);
    //isTypingTimeoutCallback();

    // TODO:
    // dialogsMessages.push(msg);
  }


  retrieveUsersForDialogCreation(callback) {
    this.retrieveUsers(this.usersForDialogCreationStats, callback);
  }

  retrieveUsersForDialogUpdate(callback) {
    this.retrieveUsers(this.usersForDialogUpdateStats, callback);
  }

  retrieveUsers(usersStorage, callback) {

    // we got all users
    if (usersStorage.totalEntries != null && usersStorage.retrievedCount >= usersStorage.totalEntries) {
      callback(null);
      return;
    }

    // $("#load-users").show(0);
    usersStorage.currentPage = usersStorage.currentPage + 1;

    // Load users, 10 per request
    //
    QB.users.listUsers({page: usersStorage.currentPage, per_page: '10'}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);

        this.mergeUsers(result.items);

        callback(result.items);

        //$("#load-users").delay(100).fadeOut(500);

        usersStorage.totalEntries = result.total_entries;
        usersStorage.retrievedCount = usersStorage.retrievedCount + result.items.length;
      }
    });
  }

  updateDialogsUsersStorage(usersIds, callback){
    var params = {filter: {field: 'id', param: 'in', value: usersIds}, per_page: 100};

    QB.users.listUsers(params, function(err, result){
      if (result) {
        this.mergeUsers(result.items);
      }

      callback();
    });
  }

  mergeUsers(usersItems){
    var newUsers = {};
    usersItems.forEach(function(item, i, arr) {
      newUsers[item.user.id] = item.user;
    });
    // TODO:
    // this.users = $.extend(this.users, newUsers);
  }

  getUserLoginById(byId) {
  	var userLogin;
  	if (this.users[byId]) {
  		userLogin = this.users[byId].login;
  		return userLogin;
  	}
  }
}
