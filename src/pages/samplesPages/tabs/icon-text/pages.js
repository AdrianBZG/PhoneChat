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
import { Platform } from 'ionic-angular';
var TabIconTextContentPage = (function () {
    function TabIconTextContentPage(platform) {
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
    }
    return TabIconTextContentPage;
}());
TabIconTextContentPage = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar [color]=\"isAndroid ? 'royal' : 'primary'\">\n        <ion-title>Tabs</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content>\n    </ion-content>\n"
    }),
    __metadata("design:paramtypes", [Platform])
], TabIconTextContentPage);
export { TabIconTextContentPage };
var IconTextPage = (function () {
    function IconTextPage(platform) {
        this.rootPage = TabIconTextContentPage;
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
    }
    return IconTextPage;
}());
IconTextPage = __decorate([
    Component({
        template: "\n    <ion-tabs class=\"tabs-icon-text\" [color]=\"isAndroid ? 'royal' : 'primary'\">\n      <ion-tab tabIcon=\"water\" tabTitle=\"Water\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabIcon=\"leaf\" tabTitle=\"Life\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabIcon=\"flame\" tabTitle=\"Fire\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabIcon=\"magnet\" tabTitle=\"Force\" [root]=\"rootPage\"></ion-tab>\n    </ion-tabs>\n"
    }),
    __metadata("design:paramtypes", [Platform])
], IconTextPage);
export { IconTextPage };
