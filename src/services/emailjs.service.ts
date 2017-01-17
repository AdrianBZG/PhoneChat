import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AppService} from "./app.service";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

declare var emailjs;

@Injectable()
export class EmailJSService {
    constructor(private http: Http, private appService: AppService) {
      emailjs.init("user_rrAgulOI1cjOHtGISTMP7");
    }

    sendEmail(sender: string, receiverName: string, receiverEmail: string) {
      emailjs.send("default_service","template_GcBsLavA",{from_name: sender, to_name: receiverName, to_email: receiverEmail});
    }
}
