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
var BasicPage = (function () {
    function BasicPage() {
        this.press = 0;
        this.pan = 0;
        this.swipe = 0;
        this.tap = 0;
    }
    BasicPage.prototype.pressEvent = function (e) {
        this.press++;
    };
    BasicPage.prototype.panEvent = function (e) {
        this.pan++;
    };
    BasicPage.prototype.swipeEvent = function (e) {
        this.swipe++;
    };
    BasicPage.prototype.tapEvent = function (e) {
        this.tap++;
    };
    return BasicPage;
}());
BasicPage = __decorate([
    Component({
        templateUrl: 'template.html'
    }),
    __metadata("design:paramtypes", [])
], BasicPage);
export { BasicPage };
