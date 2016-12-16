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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupService } from '../../services/signup.service';
import { Login } from '../login/pages';
import { Chat } from '../chat/pages';
var SignUp = (function () {
    function SignUp(navCtrl, navParams, alertCtrl, signupService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.signupService = signupService;
        this.userName = "";
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.passwordRetype = "";
    }
    SignUp.prototype.login = function () {
        this.navCtrl.setRoot(Login);
    };
    SignUp.prototype.signup = function () {
        var _this = this;
        console.log(this.userName);
        try {
            this.signupService.signup(this.userName, this.name, this.lastName, this.password, this.passwordRetype, this.email)
                .then(function (resp) {
                console.log("setRoot");
                _this.navCtrl.setRoot(Chat);
            }, function (err) { _this.showError(err); });
        }
        catch (err) {
            this.showError(err);
        }
    };
    SignUp.prototype.showError = function (err) {
        var alert = this.alertCtrl.create({
            title: 'Invalid input',
            message: err,
            buttons: ['OK']
        });
        alert.present();
    };
    return SignUp;
}());
SignUp = __decorate([
    Component({
        selector: 'signup',
        styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
        templateUrl: 'template.html',
        providers: [SignupService],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        SignupService])
], SignUp);
export { SignUp };
