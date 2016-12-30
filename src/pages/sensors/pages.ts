import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import { AppService } from '../../services/app.service';
import { EventList } from '../event-list/pages';

declare var $;

@Component({
  selector: 'sensors',
  templateUrl: 'template.html',
})
export class Sensors {
  public latitude: any;
  public longitude: any;
  private timer;
  private accuracy: any;
  private altitude: any;
  private altitudeAccuracy: any;
  private heading: any;
  private speed: any;
  private timestampAttr: any;
  private citynameattr: any;
  private countrynameattr: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private menu: MenuController,
    public appService: AppService
  ) {
  }

  ionViewDidLoad() {
    this.menu.enable(false);

    Geolocation.getCurrentPosition().then((geoposition) => {
      $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: geoposition.coords.latitude, lon: geoposition.coords.longitude}, function(data) {
        console.log(data.address.city);
        console.log(data.address.country);
        this.citynameattr = data.address.city;
        this.countrynameattr = data.address.country;
      });
    });

    this.timer = setInterval(() => Geolocation.getCurrentPosition().then((geoposition) => {
      this.latitude = geoposition.coords.latitude;
      this.longitude = geoposition.coords.longitude;
      this.accuracy = geoposition.coords.accuracy;
      this.altitude = geoposition.coords.altitude;
      this.altitudeAccuracy = geoposition.coords.altitudeAccuracy;
      this.heading = geoposition.coords.heading;
      this.speed = geoposition.coords.speed;
      this.timestampAttr = geoposition.timestamp;
    }), 500);

    //this.getCityName();
  }

  eventListPage() {
    this.navCtrl.push(EventList)
  }

  getCityName() {
    Geolocation.getCurrentPosition().then((geoposition) => {
      //this.mymap = L.map('mapid').setView([geoposition.coords.latitude, geoposition.coords.longitude], 15);
      $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: geoposition.coords.latitude, lon: geoposition.coords.longitude}, function(data) {
        this.citynameattr = 'hola';
        console.log('City: ' + data.address.city);
        //this.cityName = 'City: ' + data.address.city;
      });
    });
  }
}
