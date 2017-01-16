import {Component} from "@angular/core";
import {AppService} from "../../services/app.service";

declare var QB;

@Component({
    selector: 'event-list',
    templateUrl: 'template.html',
})
export class DevelopersPage {
    constructor(public appService: AppService) {
    }

    ionViewDidLoad() {
    }
}
