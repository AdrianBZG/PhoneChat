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
import { ToastController } from 'ionic-angular';
var BasicPage = (function () {
    function BasicPage(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    BasicPage.prototype.showToast = function (position) {
        var toast = this.toastCtrl.create({
            message: 'Mmmm, buttered toast',
            duration: 2000,
            position: position
        });
        toast.present(toast);
    };
    BasicPage.prototype.showToastWithCloseButton = function () {
        var toast = this.toastCtrl.create({
            message: 'Your files were successfully saved',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    BasicPage.prototype.showLongToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
            duration: 2000,
        });
        toast.present();
    };
    return BasicPage;
}());
BasicPage = __decorate([
    Component({
        templateUrl: 'template.html'
    }),
    __metadata("design:paramtypes", [ToastController])
], BasicPage);
export { BasicPage };
