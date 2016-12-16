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
import { App, MenuController } from 'ionic-angular';
var BasicPage = (function () {
    function BasicPage(app, menu) {
        menu.enable(true);
    }
    return BasicPage;
}());
BasicPage = __decorate([
    Component({
        template: "\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name='menu'></ion-icon>\n    </button>\n    <ion-title>\n      Friends\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <button ion-button block menuToggle>Toggle Menu</button>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [App, MenuController])
], BasicPage);
export { BasicPage };
var PageOne = (function () {
    function PageOne() {
    }
    return PageOne;
}());
PageOne = __decorate([
    Component({
        template: "\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name='menu'></ion-icon>\n    </button>\n    <ion-title>\n      Friends\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <button ion-button block menuToggle>Toggle Menu</button>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [])
], PageOne);
export { PageOne };
var PageTwo = (function () {
    function PageTwo() {
    }
    return PageTwo;
}());
PageTwo = __decorate([
    Component({
        template: "\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name='menu'></ion-icon>\n    </button>\n    <ion-title>\n      Friends\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <button ion-button block menuToggle>Toggle Menu</button>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [])
], PageTwo);
export { PageTwo };
var PageThree = (function () {
    function PageThree() {
    }
    return PageThree;
}());
PageThree = __decorate([
    Component({
        template: "\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name='menu'></ion-icon>\n    </button>\n    <ion-title>\n      Friends\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <button ion-button block menuToggle>Toggle Menu</button>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [])
], PageThree);
export { PageThree };
