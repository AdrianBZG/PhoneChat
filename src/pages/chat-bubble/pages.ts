import {Component} from "@angular/core";

export interface ChatBubbleI {
    content: string
    position: string, // 'left' | 'right',
    time: Date,
    senderName: string,
    img: string,
    cityName: string,
}

@Component({
    selector: 'chat-bubble',
    inputs: ['msg: message'],
    template: `
    <ion-item>
        <ion-avatar *ngIf="msg.position=='left'" item-left>
            <img src="{{msg.img}}">
        </ion-avatar>
        <ion-avatar *ngIf="msg.position=='right'" item-right>
            <img src="{{msg.img}}">
        </ion-avatar>
        <h2>{{msg.senderName}} from {{msg.cityName}}</h2>
        <p>{{msg.content}}</p>
    </ion-item>
  `
})
export class ChatBubble {
    msg: ChatBubbleI

    constructor() {
    }

    getFormattedDate(theDate: Date) {
        let castedDate = new Date(theDate);
        let dateDay = castedDate.getDate() + "/" + (castedDate.getMonth() + 1) + "/" + castedDate.getFullYear();
        let dateHour = castedDate.getHours() + ":" + castedDate.getMinutes() + ":" + castedDate.getSeconds();
        let finalDate = dateDay + " " + dateHour;
        return finalDate;
    }
}
