import { AlertController, NavController, NavParams } from 'ionic-angular';
export declare class Login {
    navCtrl: NavController;
    navParams: NavParams;
    alertCtrl: AlertController;
    password: any;
    email: any;
    constructor(navCtrl: NavController, navParams: NavParams, alertCtrl: AlertController);
    signup(): void;
    login(): void;
}
