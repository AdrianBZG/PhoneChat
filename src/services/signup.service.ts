import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';

declare var QB;

@Injectable()
export class SignupService {
  emailReg : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private http : Http, private appService : AppService) {}

  signup(userName: string, name: string, lastName: string, password: string, passwordRetype: string, email: string) {
    userName = userName.trim();
    if (userName == "") {
      throw new Error("Empty user name");
    }
    name = name.trim();
    if (name == "") {
      throw new Error("Empty name");
    }
    if (password.length <= 8) {
      throw new Error("Password too short");
    }
    if (password != passwordRetype) {
      throw new Error("Password Missmatch");
    }
    if (!this.emailReg.test(email)) {
      throw new Error("Not recognise as email");
    }

    let hashedPassword = this.appService.hashCodeString(password);

    return Promise.all([this.http.post(this.appService.getRegisterAPI(),
        { email: email
        , userName: userName
        , firstName: name
        , lastName: lastName
        , password: hashedPassword
        }
      ).toPromise().then(() => { console.log("terminaaaaa")}),
      this.signupQuickBlox(userName, hashedPassword.toString())
     ]);
  }

  signupQuickBlox(name : string, password : string) {
    return new Promise<any>((resolve, reject) => {
      QB.createSession((err, result) => {
        let params = { 'login': name, 'password': password};

        QB.users.create(params, (err, user) => {
          if (!user) {
            throw "Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.";
          }
          else {
            // TODO: Insecure of what it is user
            console.log(user);
            this.appService.setUserProperties(name, password, user.user_id);
            this.appService.connectToChat()
              .subscribe(
                (conneted) => resolve(user),
                (error) => reject("To Login"));  // TODO this very wrong
          }
        });
      });
    });
  }
}
