var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Login } from '../pages/login/pages';
import { LoginService } from '../services/login.service';
import { Chat } from '../pages/chat/pages';
var MyApp = (function () {
    function MyApp(platform, menu, storage, loginService) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.storage = storage;
        this.loginService = loginService;
        this.rootPage = Login;
        Promise
            .all([storage.get("user"), storage.get("password")])
            .then(function (_a) {
            var user = _a[0], password = _a[1];
            if (user !== null && password !== null) {
                console.log(user + password);
                _this.loginService
                    .login(user, password)
                    .then(function (resp) { return _this.nav.setRoot(Chat); });
            }
        });
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        selector: 'main',
        templateUrl: 'app.template.html',
        providers: [LoginService]
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController,
        Storage,
        LoginService])
], MyApp);
export { MyApp };
