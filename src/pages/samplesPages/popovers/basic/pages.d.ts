import { ElementRef } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';
export declare class PopoverPage {
    private navParams;
    background: string;
    contentEle: any;
    textEle: any;
    fontFamily: any;
    colors: {
        'white': {
            'bg': string;
            'fg': string;
        };
        'tan': {
            'bg': string;
            'fg': string;
        };
        'grey': {
            'bg': string;
            'fg': string;
        };
        'black': {
            'bg': string;
            'fg': string;
        };
    };
    constructor(navParams: NavParams);
    ngOnInit(): void;
    getColorName(background: any): string;
    setFontFamily(): void;
    changeBackground(color: any): void;
    changeFontSize(direction: any): void;
    changeFontFamily(): void;
}
export declare class BasicPage {
    private popoverCtrl;
    content: ElementRef;
    text: ElementRef;
    constructor(popoverCtrl: PopoverController);
    presentPopover(ev: any): void;
}
