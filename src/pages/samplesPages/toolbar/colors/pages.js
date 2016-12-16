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
import { NavController } from 'ionic-angular';
var Page4 = (function () {
    function Page4(nav) {
        this.nav = nav;
    }
    Page4.prototype.goBack = function () {
        this.nav.setRoot(ColorsPage);
    };
    return Page4;
}());
Page4 = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar color=\"light\">\n        <ion-title>Toolbar: Light</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n      <button ion-button block (click)=\"goBack()\">Go Back to Beginning</button>\n    </ion-content>\n  "
    }),
    __metadata("design:paramtypes", [NavController])
], Page4);
export { Page4 };
var Page3 = (function () {
    function Page3(nav) {
        this.nav = nav;
    }
    Page3.prototype.pushPage = function () {
        this.nav.push(Page4);
    };
    return Page3;
}());
Page3 = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar color=\"danger\">\n        <ion-title>Toolbar: Danger</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n      <button ion-button block (click)=\"pushPage()\">Next Page</button>\n    </ion-content>\n  "
    }),
    __metadata("design:paramtypes", [NavController])
], Page3);
export { Page3 };
var Page2 = (function () {
    function Page2(nav) {
        this.nav = nav;
    }
    Page2.prototype.pushPage = function () {
        this.nav.push(Page3);
    };
    return Page2;
}());
Page2 = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar color=\"secondary\">\n        <ion-title>Toolbar: Secondary</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n      <button ion-button block (click)=\"pushPage()\">Next Page</button>\n    </ion-content>\n  "
    }),
    __metadata("design:paramtypes", [NavController])
], Page2);
export { Page2 };
var ColorsPage = (function () {
    function ColorsPage(nav) {
        this.nav = nav;
    }
    ColorsPage.prototype.pushPage = function () {
        this.nav.push(Page2);
    };
    return ColorsPage;
}());
ColorsPage = __decorate([
    Component({
        template: "\n    <ion-header>\n      <ion-navbar color=\"primary\">\n        <ion-title>Toolbar: Primary</ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n      <button ion-button block (click)=\"pushPage()\">Next Page</button>\n    </ion-content>\n  "
    }),
    __metadata("design:paramtypes", [NavController])
], ColorsPage);
export { ColorsPage };
