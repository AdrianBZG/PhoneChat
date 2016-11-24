import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, AlertController } from 'ionic-angular';
var serverURL = "http://localhost:8100/api/account/register";
var ApiMessages;
(function (ApiMessages) {
    ApiMessages[ApiMessages["EMAIL_NOT_FOUND"] = 0] = "EMAIL_NOT_FOUND";
    ApiMessages[ApiMessages["INVALID_PWD"] = 1] = "INVALID_PWD";
    ApiMessages[ApiMessages["DB_ERROR"] = 2] = "DB_ERROR";
    ApiMessages[ApiMessages["NOT_FOUND"] = 3] = "NOT_FOUND";
    ApiMessages[ApiMessages["EMAIL_ALREADY_EXISTS"] = 4] = "EMAIL_ALREADY_EXISTS";
    ApiMessages[ApiMessages["COULD_NOT_CREATE_USER"] = 5] = "COULD_NOT_CREATE_USER";
    ApiMessages[ApiMessages["PASSWORD_RESET_EXPIRED"] = 6] = "PASSWORD_RESET_EXPIRED";
    ApiMessages[ApiMessages["PASSWORD_RESET_HASH_MISMATCH"] = 7] = "PASSWORD_RESET_HASH_MISMATCH";
    ApiMessages[ApiMessages["PASSWORD_RESET_EMAIL_MISMATCH"] = 8] = "PASSWORD_RESET_EMAIL_MISMATCH";
    ApiMessages[ApiMessages["COULD_NOT_RESET_PASSWORD"] = 9] = "COULD_NOT_RESET_PASSWORD";
    ApiMessages[ApiMessages["PASSWORD_CONFIRM_MISMATCH"] = 10] = "PASSWORD_CONFIRM_MISMATCH";
})(ApiMessages || (ApiMessages = {}));
import { Login } from '../login/pages';
import { Chat } from '../chat/pages';
export var SignUp = (function () {
    function SignUp(navCtrl, navParams, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    SignUp.prototype.login = function () {
        this.navCtrl.setRoot(Login);
    };
    SignUp.prototype.signup = function () {
        var _this = this;
        this.userName = this.userName.trim();
        if (this.userName == "") {
            return this.showError("Empty user name");
        }
        this.name = this.name.trim();
        if (this.name == "") {
            return this.showError("Empty name");
        }
        if (this.password.length <= 8) {
            return this.showError("Password too short");
        }
        if (this.password != this.passwordRetype) {
            return this.showError("Password Missmatch");
        }
        if (!this.emailReg.test(this.email)) {
            return this.showError("Not recognise as email");
        }
        this.http.post(serverURL, { email: this.email,
            userName: this.userName,
            firstName: this.name,
            lastName: this.lastName,
            password: this.password
        }).subscribe(function (resp) {
            if (resp.ok) {
                _this.navCtrl.setRoot(Chat);
            }
        });
        /*
            $.ajax(
              { type: 'POST',
                url: serverURL,
                data: "email=" + this.email + "&firstName=" + this.name + "&lastName=" + this.lastName + "&password=" + this.password,
                success: (resp) => {
                  if (resp.success === true) {
                    QB.createSession((err,result) => {
                      let params = { 'login': this.name, 'password': this.password};
        
                      QB.users.create(params, (err, user) => {
                        if (user) {
                          this.navCtrl.setRoot(Chat); // TODO Pass session
                        } else  {
                          this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.")
                        }
                      });
                    });
                    return;
                  } else {
                    if (resp.extras.msg) {
                      switch (resp.extras.msg) {
                        case ApiMessages.DB_ERROR:
                        case ApiMessages.COULD_NOT_CREATE_USER:
                          // TODO: Use a friendlier error message below.
                          this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.")
                          break;
                        case ApiMessages.EMAIL_ALREADY_EXISTS:
                          this.showError("The email address that you provided is already registered.");
                          break;
                      }
                    }
                  }
                },
                error: (e) => {
                  console.log(e);
                  // TODO: Use a friendlier error message below.
                  this.showError("Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.");
                }
              }
            );
        */
    };
    SignUp.prototype.showError = function (err) {
        var alert = this.alertCtrl.create({
            title: 'Invalid input',
            message: err,
            buttons: ['OK']
        });
        alert.present();
    };
    SignUp.decorators = [
        { type: Component, args: [{
                    selector: 'signup',
                    templateUrl: 'template.html',
                },] },
    ];
    /** @nocollapse */
    SignUp.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: AlertController, },
        { type: Http, },
    ];
    return SignUp;
}());
