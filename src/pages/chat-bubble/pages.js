var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var ChatBubble = (function () {
    function ChatBubble() {
    }
    return ChatBubble;
}());
ChatBubble = __decorate([
    Component({
        selector: 'chat-bubble',
        inputs: ['msg: message'],
        template: "\n  <div class=\"chatBubble\">\n    <img class=\"profile-pic {{msg.position}}\" src=\"{{msg.img}}\">\n    <div class=\"chat-bubble {{msg.position}}\">\n      <div class=\"message\">{{msg.content}}</div>\n      <div class=\"message-detail\">\n          <span style=\"font-weight:bold;\">{{msg.senderName}} </span>,\n          <span>{{msg.time}}</span>\n      </div>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], ChatBubble);
export { ChatBubble };
