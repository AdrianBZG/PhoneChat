import { ToastController } from 'ionic-angular';
export declare class BasicPage {
    toastCtrl: ToastController;
    constructor(toastCtrl: ToastController);
    showToast(position: string): void;
    showToastWithCloseButton(): void;
    showLongToast(): void;
}
