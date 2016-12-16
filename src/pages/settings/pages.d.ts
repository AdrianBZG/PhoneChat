import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
export declare class Settings {
    navCtrl: NavController;
    navParams: NavParams;
    appService: AppService;
    constructor(navCtrl: NavController, navParams: NavParams, appService: AppService);
    disconnect(): void;
}
