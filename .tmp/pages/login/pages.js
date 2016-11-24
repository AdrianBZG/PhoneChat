import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { SignUp } from '../signup/pages';
import { Chat } from '../chat/pages';
export var Login = (function () {
    function Login(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    Login.prototype.signup = function () {
        this.navCtrl.setRoot(SignUp);
    };
    Login.prototype.login = function () {
        console.log("Login" + this.password + this.email);
        if (true) {
            this.navCtrl.setRoot(Chat);
        }
    };
    Login.decorators = [
        { type: Component, args: [{
                    selector: 'login',
                    templateUrl: 'template.html',
                },] },
    ];
    /** @nocollapse */
    Login.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: AlertController, },
    ];
    return Login;
}());
