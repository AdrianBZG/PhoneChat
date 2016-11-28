import { Injectable } from "@angular/core";
import { AppService } from "./app.service";

declare var QB;

@Injectable()
export class ConversationService {
  constructor(
    private appService : AppService
  ) {}

  /// Return messages from current chat (locate in appService)
  getListOfMessages() : Promise<any[]> {
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
}
