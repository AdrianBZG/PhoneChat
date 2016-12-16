import { AlertController, NavController, NavParams } from 'ionic-angular';
import { LoginService } from "../../services/login.service";
export declare class Login {
    navCtrl: NavController;
    navParams: NavParams;
    alertCtrl: AlertController;
    private loginService;
    password: string;
    userName: string;
    constructor(navCtrl: NavController, navParams: NavParams, alertCtrl: AlertController, loginService: LoginService);
    signup(): void;
    login(): void;
    showError(err: string): void;
}
