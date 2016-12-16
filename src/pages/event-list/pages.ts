import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import * as Leaflet from "leaflet";
import { AppService } from '../../services/app.service';


interface MapEvent {
  location : any, // Geoposition
  description: string,
  name: string,
  participants: number[],
}


@Component({
  selector: 'event-list',
  templateUrl: 'template.html',
})
export class EventList {
  private _latLng: any;
  private marker: any;
  private map: any  ;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private menu: MenuController,
    public appService: AppService
  ) {}

  set latLng(value) {
    this._latLng = value;
    this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    //this.loadMap();
    Geolocation.getCurrentPosition().then((geoposition) => {
      this._latLng = Leaflet.latLng(geoposition.coords.latitude, geoposition.coords.longitude);

      setTimeout(this.loadMap.bind(this), 100);
      //this._latLng = Leaflet.marker([geoposition.coords.latitude, geoposition.coords.longitude]).addTo(this.map);
    });
  }

  loadMap() {
    this.map = Leaflet
      .map("map")
      .setView(this.latLng, 13)
      .on("click", this.onMapClicked.bind(this))

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    this.marker = Leaflet
      .marker(this.latLng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);
  }

  onMapClicked(e) {
    this.latLng = e.latlng;
  }

  onMarkerPositionChanged(e) {
    const latlng = e.target.getLatLng();

    this.latLng = latlng;
  }

  /**
   * Load events from server(mongodb)
   */
  loadEvents() {

  }

  saveEvent() {

  }
}