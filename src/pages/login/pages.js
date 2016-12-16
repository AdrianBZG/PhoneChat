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
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { SignUp } from '../signup/pages';
import { Chat } from '../chat/pages';
import { LoginService } from "../../services/login.service";
var Login = (function () {
    function Login(navCtrl, navParams, alertCtrl, loginService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loginService = loginService;
        this.password = "";
        this.userName = "";
    }
    Login.prototype.signup = function () {
        this.navCtrl.setRoot(SignUp);
    };
    Login.prototype.login = function () {
        var _this = this;
        console.log("Login " + this.password + this.userName);
        this.loginService.login(this.userName, this.password)
            .then(function (response) {
            _this.navCtrl.setRoot(Chat);
        }, function (err) {
            _this.showError(err);
        });
    };
    Login.prototype.showError = function (err) {
        var alert = this.alertCtrl.create({
            title: 'Invalid input',
            message: err,
            buttons: ['OK']
        });
        alert.present();
    };
    return Login;
}());
Login = __decorate([
    Component({
        styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
        templateUrl: 'template.html',
        providers: [LoginService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        LoginService])
], Login);
export { Login };
