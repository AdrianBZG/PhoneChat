import { Component, NgZone, ViewChild } from '@angular/core';
import { MenuController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Login } from '../pages/login/pages';
import { SignUp } from '../pages/signup/pages';

@Component({
  selector: 'main',
  templateUrl: 'app.template.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = SignUp;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
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
