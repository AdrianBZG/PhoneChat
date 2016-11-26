import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';

declare var QB;

/*
// Efficient but complicated to maintain
enum ApiMessages {
  EMAIL_NOT_FOUND = 0,
  INVALID_PWD = 1,
  DB_ERROR = 2,
  NOT_FOUND = 3,
  EMAIL_ALREADY_EXISTS = 4,
  COULD_NOT_CREATE_USER = 5,
  PASSWORD_RESET_EXPIRED = 6,
  PASSWORD_RESET_HASH_MISMATCH = 7,
  PASSWORD_RESET_EMAIL_MISMATCH = 8,
  COULD_NOT_RESET_PASSWORD = 9,
  PASSWORD_CONFIRM_MISMATCH = 10,
}
*/

@Injectable()
export class SignupService {
  emailReg : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private http : Http, private appService : AppService) {}

  signup(userName: string, name: string, lastName: string, password: string, passwordRetype: string, email: string) {
    console.log("Signup an user" + userName);
    userName = userName.trim();
    if (userName == "") {
      throw "Empty user name";
    }
    name = name.trim();
    if (name == "") {
      throw "Empty name";
    }
    if (password.length <= 8) {
      throw "Password too short";
    }
    if (password != passwordRetype) {
      throw "Password Missmatch";
    }
    if (!this.emailReg.test(email)) {
      throw "Not recognise as email";
    }
    this.http.post(this.appService.getRegisterAPI(),
      { email: email
      , userName: userName
      , firstName: name
      , lastName: lastName
      , password: password
      }
    ).subscribe(resp => {
      if (resp.ok) {
        this.signupQuickBlox(userName, password);
      }
    });
  }

  signupQuickBlox(name : string, password : string) {
    QB.createSession((err, result) => {
      let params = { 'login': name, 'password': password};

      QB.users.create(params, (err, user) => {
        if (!user) {
          throw "Oops! PhoneChat had a problem and could not register you.  Please try again in a few minutes.";
        }
        else {
          this.appService.user = name;
          this.appService.password = password;
        }
      });
    });
  }
}
