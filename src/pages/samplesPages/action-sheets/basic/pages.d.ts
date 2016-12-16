import { Platform, ActionSheetController } from 'ionic-angular';
export declare class BasicPage {
    platform: Platform;
    actionsheetCtrl: ActionSheetController;
    constructor(platform: Platform, actionsheetCtrl: ActionSheetController);
    openMenu(): void;
}
