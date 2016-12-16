import { NavController, NavParams } from 'ionic-angular';
export declare class NavigationDetailsPage {
    item: any;
    constructor(params: NavParams);
}
export declare class BasicPage {
    nav: NavController;
    items: any[];
    constructor(nav: NavController);
    openNavDetailsPage(item: any): void;
}
