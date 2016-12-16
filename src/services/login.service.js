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
import 'rxjs/add/operator/toPromise';
import { AppService } from './app.service';
var LoginService = (function () {
    function LoginService(http, app) {
        this.http = http;
        this.app = app;
    }
    LoginService.prototype.login = function (userName, password) {
        var _this = this;
        var serverLogin = this.http
            .post(this.app.getLoginURL(), { userName: userName, password: password })
            .toPromise();
        var qbLogin = new Promise(function (resolve, reject) {
            QB.createSession({ login: userName, password: password }, function (err, res) {
                if (err) {
                    console.log("error");
                    reject(new Error("Error on create QuickBlox Session"));
                }
                else {
                    _this.app.setUserProperties(userName, password, res.user_id);
                    _this.app.connectToChat()
                        .subscribe(function (roster) {
                        console.log("ROSETERR");
                        console.log(JSON.stringify(roster));
                    }, function (error) { reject(error); }, function () { resolve(res); });
                }
            });
        });
        return Promise.all([serverLogin, qbLogin]);
    };
    ;
    return LoginService;
}());
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AppService])
], LoginService);
export { LoginService };
