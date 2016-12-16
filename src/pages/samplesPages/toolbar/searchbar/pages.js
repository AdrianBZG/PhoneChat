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
var SearchbarPage = (function () {
    function SearchbarPage() {
        this.initializeItems();
    }
    SearchbarPage.prototype.initializeItems = function () {
        this.items = [
            'Angular 1.x',
            'Angular 2',
            'ReactJS',
            'EmberJS',
            'Meteor',
            'Typescript',
            'Dart',
            'CoffeeScript'
        ];
    };
    SearchbarPage.prototype.getItems = function (ev) {
        this.initializeItems();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    return SearchbarPage;
}());
SearchbarPage = __decorate([
    Component({
        templateUrl: 'template.html'
    }),
    __metadata("design:paramtypes", [])
], SearchbarPage);
export { SearchbarPage };
