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
import { AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
var BasicPage = (function () {
    function BasicPage(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.form = new FormGroup({
            firstName: new FormControl("", Validators.required),
            lastName: new FormControl("", Validators.required)
        });
    }
    BasicPage.prototype.processForm = function () {
        var alert = this.alertCtrl.create({
            title: "Account Created",
            message: "Created Account for: " + this.form.value.firstName + " " + this.form.value.lastName,
            buttons: [{
                    text: 'Ok',
                }]
        });
        if (this.form.status === 'VALID') {
            alert.present();
        }
    };
    return BasicPage;
}());
BasicPage = __decorate([
    Component({
        templateUrl: 'template.html',
    }),
    __metadata("design:paramtypes", [AlertController])
], BasicPage);
export { BasicPage };
