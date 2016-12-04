import {Component} from '@angular/core';

export interface ChatBubbleI {
    content: string
    position: string, // 'left' | 'right',
    time: string,
    senderName : string,
    img: string,
}

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
  `
  <div class="chatBubble">
    <img class="profile-pic {{msg.position}}" src="{{msg.img}}">
    <div class="chat-bubble {{msg.position}}">
      <div class="message">{{msg.content}}</div>
      <div class="message-detail">
          <span style="font-weight:bold;">{{msg.senderName}} </span>,
          <span>{{msg.time}}</span>
      </div>
    </div>
  </div>
  `
})
export class ChatBubble {
  msg : ChatBubbleI

  constructor() {}
}
