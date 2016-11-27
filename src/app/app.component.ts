import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { Login } from '../pages/login/pages';
import { LoginService } from '../services/login.service';

import { Chat } from '../pages/chat/pages';

@Component({
  selector: 'main',
  templateUrl: 'app.template.html',
  providers: [ LoginService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = Login;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage,
    private loginService: LoginService,
  ) {
    Promise
      .all([storage.get("user"), storage.get("password")])
      .then(([user, password]) => {
        if (user!==null && password!==null) {
          console.log(user+password);
          this.loginService
            .login(user, password)
            .then((resp) => this.nav.setRoot(Chat));
        }
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
