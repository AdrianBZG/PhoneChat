import {Component} from '@angular/core';

export interface ChatBubbleI {
    content: string
    position: string, // 'left' | 'right',
    time: Date,
    senderName : string,
    img: string,
    cityName: string,
}

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template: `
  <div class="chatBubble">
    <img class="profile-pic {{msg.position}}" src="{{msg.img}}">
    <div class="chat-bubble {{msg.position}}">
      <div class="message-detail">
          <span style="font-weight:bold;">{{msg.senderName}} </span><br>
          <b>Sent:</b> {{getFormattedDate(msg.time)}})<br>
          <b>Location:</b> {{msg.cityName}}<br><br>
      </div>
      <div class="message"><b>Message:</b> {{msg.content}}</div>
    </div>
  </div>
  `
})
export class ChatBubble {
  msg : ChatBubbleI

  constructor() {}

  getFormattedDate(theDate: Date) {
    let castedDate = new Date(theDate);
    let dateDay = castedDate.getDate()  + "/"  + (castedDate.getMonth()+1) +  "/" +  castedDate.getFullYear();
    let dateHour = castedDate.getHours() + ":" + castedDate.getMinutes()  + ":"  + castedDate.getSeconds();
    let finalDate = dateDay + " " + dateHour;
    return finalDate;
  }
}
