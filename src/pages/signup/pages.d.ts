import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupService } from '../../services/signup.service';
export declare class SignUp {
    navCtrl: NavController;
    navParams: NavParams;
    alertCtrl: AlertController;
    private signupService;
    userName: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordRetype: string;
    constructor(navCtrl: NavController, navParams: NavParams, alertCtrl: AlertController, signupService: SignupService);
    login(): void;
    signup(): void;
    showError(err: string): void;
}
