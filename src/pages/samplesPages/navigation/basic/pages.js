var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
var NavigationDetailsPage = (function () {
    function NavigationDetailsPage(params) {
        this.item = params.data.item;
    }
    return NavigationDetailsPage;
}());
NavigationDetailsPage = __decorate([
    Component({
        templateUrl: 'navigation-details.html',
    }),
    __metadata("design:paramtypes", [NavParams])
], NavigationDetailsPage);
export { NavigationDetailsPage };
var BasicPage = (function () {
    function BasicPage(nav) {
        this.nav = nav;
        this.items = [];
        this.items = [
            {
                'title': 'Angular',
                'icon': 'angular',
                'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
                'color': '#E63135'
            },
            {
                'title': 'CSS3',
                'icon': 'css3',
                'description': 'The latest version of cascading stylesheets - the styling language of the web!',
                'color': '#0CA9EA'
            },
            {
                'title': 'HTML5',
                'icon': 'html5',
                'description': 'The latest version of the web\'s markup language.',
                'color': '#F46529'
            },
            {
                'title': 'JavaScript',
                'icon': 'javascript',
                'description': 'One of the most popular programming languages on the Web!',
                'color': '#FFD439'
            },
            {
                'title': 'Sass',
                'icon': 'sass',
                'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
                'color': '#CE6296'
            },
            {
                'title': 'NodeJS',
                'icon': 'nodejs',
                'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
                'color': '#78BD43'
            },
            {
                'title': 'Python',
                'icon': 'python',
                'description': 'A clear and powerful object-oriented programming language!',
                'color': '#3575AC'
            },
            {
                'title': 'Markdown',
                'icon': 'markdown',
                'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
                'color': '#412159'
            },
            {
                'title': 'Tux',
                'icon': 'tux',
                'description': 'The official mascot of the Linux kernel!',
                'color': '#000'
            },
        ];
    }
    BasicPage.prototype.openNavDetailsPage = function (item) {
        this.nav.push(NavigationDetailsPage, { item: item });
    };
    return BasicPage;
}());
BasicPage = __decorate([
    Component({
        template: "\n<ion-header>\n  <ion-navbar>\n    <ion-title>Navigation</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor=\"let item of items\" (click)=\"openNavDetailsPage(item)\" icon-left>\n      <ion-icon [name]=\"'logo-' + item.icon\" [ngStyle]=\"{'color': item.color}\" item-left></ion-icon>\n      {{ item.title }}\n    </button>\n  </ion-list>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [NavController])
], BasicPage);
export { BasicPage };
