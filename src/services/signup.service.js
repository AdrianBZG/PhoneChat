var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { AppService } from './app.service';
var SignupService = (function () {
    function SignupService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    SignupService.prototype.signup = function (userName, name, lastName, password, passwordRetype, email) {
        userName = userName.trim();
        if (userName == "") {
            throw new Error("Empty user name");
        }
        name = name.trim();
        if (name == "") {
            throw new Error("Empty name");
        }
        if (password.length <= 8) {
            throw new Error("Password too short");
        }
        if (password != passwordRetype) {
            throw new Error("Password Missmatch");
        }
        if (!this.emailReg.test(email)) {
            throw new Error("Not recognise as email");
        }
        return Promise.all([this.http.post(this.appService.getRegisterAPI(), { email: email,
                userName: userName,
                firstName: name,
                lastName: lastName,
                password: password
            }).toPromise().then(function () { console.log("terminaaaaa"); }),
            this.signupQuickBlox(userName, password)
        ]);
    };
    SignupService.prototype.signupQuickBlox = function (name, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            QB.createSession(function (err, result) {
                var params = { 'login': name, 'password': password };
                QB.users.create(params, function (err, user) {
                    if (!user) {
                        throw "Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.";
                    }
                    else {
                        console.log(user);
                        _this.appService.setUserProperties(name, password, user.user_id);
                        _this.appService.connectToChat()
                            .subscribe(function (conneted) { return resolve(user); }, function (error) { return reject("To Login"); });
                    }
                });
            });
        });
    };
    return SignupService;
}());
SignupService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AppService])
], SignupService);
export { SignupService };
