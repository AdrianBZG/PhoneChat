import { MenuController, Platform, Nav } from 'ionic-angular';
export declare class MyApp {
    platform: Platform;
    menu: MenuController;
    nav: Nav;
    rootPage: any;
    pages: Array<{
        title: string;
        component: any;
    }>;
    constructor(platform: Platform, menu: MenuController);
    initializeApp(): void;
    openPage(page: any): void;
}
