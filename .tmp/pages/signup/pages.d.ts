import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, AlertController } from 'ionic-angular';
export declare class SignUp {
    navCtrl: NavController;
    navParams: NavParams;
    alertCtrl: AlertController;
    private http;
    emailReg: RegExp;
    userName: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordRetype: string;
    constructor(navCtrl: NavController, navParams: NavParams, alertCtrl: AlertController, http: Http);
    login(): void;
    signup(): void;
    showError(err: string): void;
}
