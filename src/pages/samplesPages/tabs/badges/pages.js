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
var TabBadgesContent = (function () {
    function TabBadgesContent() {
    }
    return TabBadgesContent;
}());
TabBadgesContent = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>Tabs</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content>\n    </ion-content>\n"
    }),
    __metadata("design:paramtypes", [])
], TabBadgesContent);
export { TabBadgesContent };
var BadgesPage = (function () {
    function BadgesPage() {
        this.rootPage = TabBadgesContent;
    }
    return BadgesPage;
}());
BadgesPage = __decorate([
    Component({
        template: "\n    <ion-tabs>\n      <ion-tab tabIcon=\"call\" [root]=\"rootPage\" tabBadge=\"3\" tabBadgeStyle=\"danger\"></ion-tab>\n      <ion-tab tabIcon=\"chatbubbles\" [root]=\"rootPage\" tabBadge=\"14\" tabBadgeStyle=\"danger\"></ion-tab>\n      <ion-tab tabIcon=\"musical-notes\" [root]=\"rootPage\"></ion-tab>\n    </ion-tabs>\n"
    }),
    __metadata("design:paramtypes", [])
], BadgesPage);
export { BadgesPage };
