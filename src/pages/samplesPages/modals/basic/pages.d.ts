import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
export declare class BasicPage {
    modalCtrl: ModalController;
    constructor(modalCtrl: ModalController);
    openModal(characterNum: any): void;
}
export declare class ModalContentPage {
    platform: Platform;
    params: NavParams;
    viewCtrl: ViewController;
    character: any;
    constructor(platform: Platform, params: NavParams, viewCtrl: ViewController);
    dismiss(): void;
}
