import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
export var Chat = (function () {
    // Change to Signup
    //@Output() onSignup = new EventEmitter<boolean>();
    //@Output() onLogued = new EventEmitter<any>();  // Send user info session
    function Chat(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = "Ele Test"; // navParams.data....
    }
    ;
    Chat.decorators = [
        { type: Component, args: [{
                    selector: 'chat',
                    templateUrl: 'template.html',
                },] },
    ];
    /** @nocollapse */
    Chat.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
    ];
    return Chat;
}());
