import { MenuController, Platform, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/login.service';
export declare class MyApp {
    platform: Platform;
    menu: MenuController;
    storage: Storage;
    private loginService;
    nav: Nav;
    rootPage: any;
    pages: Array<{
        title: string;
        component: any;
    }>;
    constructor(platform: Platform, menu: MenuController, storage: Storage, loginService: LoginService);
    initializeApp(): void;
    openPage(page: any): void;
}
