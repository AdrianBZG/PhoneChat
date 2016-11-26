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
    this.http.post(this.app.getLoginURL(), { userName: userName, password: password})
      .subscribe((response) => {
        if (response.ok) {
        // Log into quick blox
          QB.createSession({login: userName, password: password}, (err, res) => {
            if (err) {
              throw "Error on create QuickBlox Session";
            }
            else {
              this.app.user = userName;
              this.app.password = password;
            }
          });
        }
        else {
          throw "FAil";
        }
    });
  }
}
