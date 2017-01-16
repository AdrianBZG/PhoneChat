import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Login} from "../login/pages";
import {AppService} from "../../services/app.service";

declare var $;

@Component({
    styles: ['ion-icon { display: block; text-align: center; font-size: 10em; }'],
    templateUrl: 'template.html',
})
export class Settings {
    public userName: any;
    public userId: any;
    public userIpAddress: any;

    constructor(public navCtrl: NavController
        , public navParams: NavParams
        , public appService: AppService) {
    }

    ionViewDidEnter() {
        this.userName = this.appService.user;
        this.userId = this.appService.userId;
        console.log('Hey: ');
        console.log(this.appService.userIp);
        this.userIpAddress = this.appService.userIp;
    }

    disconnect() {
        this.appService.disconnectChat();
        this.appService.unregister();
        this.navCtrl.setRoot(Login)
    }
}
