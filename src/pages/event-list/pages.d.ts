import { NavController, NavParams, MenuController } from "ionic-angular";
import { AppService } from '../../services/app.service';
export declare class EventList {
    private nav;
    private menu;
    appService: AppService;
    private _latLng;
    private marker;
    private map;
    constructor(nav: NavController, navParams: NavParams, menu: MenuController, appService: AppService);
    latLng: any;
    ionViewDidLoad(): void;
    loadMap(): void;
    onMapClicked(e: any): void;
    onMarkerPositionChanged(e: any): void;
}
