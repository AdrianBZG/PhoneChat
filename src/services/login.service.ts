import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'

import { AppService } from './app.service';


declare var QB;

@Injectable()
export class LoginService {
  constructor(private http : Http, private app : AppService) {
  }

  login(userName : string, password : string) {
    let serverLogin : Promise<Response> =
      this.http
        .post(this.app.getLoginURL(), { userName: userName, password: password})
        .toPromise();

    let qbLogin : Promise<any> = new Promise((resolve, reject) => {
        // Log into quick blox
        QB.createSession({login: userName, password: password}, (err, res) => {
          if (err) {
            console.log("error")
            reject(new Error("Error on create QuickBlox Session"));
          }
          else {
            console.log("HERERE")
            console.log(res.user_id);
            this.app.setUserProperties(userName, password, res.user_id);
            this.app.connectToChat();
            resolve(res);
          }
        });
    })
    return Promise.all([serverLogin, qbLogin])
  };
}
