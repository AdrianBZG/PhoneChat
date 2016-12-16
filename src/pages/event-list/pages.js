var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import * as Leaflet from "leaflet";
import { AppService } from '../../services/app.service';
var EventList = (function () {
    function EventList(nav, navParams, menu, appService) {
        this.nav = nav;
        this.menu = menu;
        this.appService = appService;
        console.log("ffdfasdf");
        console.log(Leaflet);
    }
    Object.defineProperty(EventList.prototype, "latLng", {
        get: function () {
            return this._latLng;
        },
        set: function (value) {
            this._latLng = value;
            this.marker.setLatLng(value);
        },
        enumerable: true,
        configurable: true
    });
    EventList.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.menu.enable(false);
        Geolocation.getCurrentPosition().then(function (geoposition) {
            _this._latLng = Leaflet.latLng(geoposition.coords.latitude, geoposition.coords.longitude);
            setTimeout(_this.loadMap.bind(_this), 100);
        });
    };
    EventList.prototype.loadMap = function () {
        console.log("HELELELEEL");
        this.map = Leaflet
            .map("map")
            .setView(this.latLng, 13)
            .on("click", this.onMapClicked.bind(this));
        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
            .addTo(this.map);
        this.marker = Leaflet
            .marker(this.latLng, { draggable: true })
            .on("dragend", this.onMarkerPositionChanged.bind(this))
            .addTo(this.map);
    };
    EventList.prototype.onMapClicked = function (e) {
        this.latLng = e.latlng;
    };
    EventList.prototype.onMarkerPositionChanged = function (e) {
        var latlng = e.target.getLatLng();
        this.latLng = latlng;
    };
    return EventList;
}());
EventList = __decorate([
    Component({
        selector: 'event-list',
        templateUrl: 'template.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        MenuController,
        AppService])
], EventList);
export { EventList };
