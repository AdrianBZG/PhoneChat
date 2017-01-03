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
    let hashedPassword = this.app.hashCodeString(password);

    let serverLogin : Promise<Response> =
      this.http
        .post(this.app.getLoginURL(), { userName: userName, password: hashedPassword})
        .toPromise();

    let qbLogin : Promise<any> = new Promise((resolve, reject) => {
        // Log into quick blox
        QB.createSession({login: userName, password: hashedPassword}, (err, res) => {
          if (err) {
            console.log("error")
            reject(new Error("Invalid credentials, please try again."));
          }
          else {
            this.app.setUserProperties(userName, hashedPassword.toString(), res.user_id);
            this.app.connectToChat()
              .subscribe(
                // TODO See users
                (roster) => {
                  console.log("ROSETERR");
                  console.log(JSON.stringify(roster))
                },
                (error) => { reject(error) },
                () => { resolve(res); }
              );
          }
        });
    })
    return Promise.all([serverLogin, qbLogin])
  };
}
