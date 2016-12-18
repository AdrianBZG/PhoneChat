import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';
import { Geolocation } from 'ionic-native';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

declare var $;

@Injectable()
export class SensorsService {
  constructor(private http : Http, private appService : AppService) {}

  getCityName() {
    Geolocation.getCurrentPosition().then((geoposition) => {
      //this.mymap = L.map('mapid').setView([geoposition.coords.latitude, geoposition.coords.longitude], 15);
      $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: geoposition.coords.latitude, lon: geoposition.coords.longitude}).then((result) => {
        let toReturn = 'City: ' + result.address.city;
        //console.log(toReturn);
        return toReturn;
      }).done(function( data ) {
        console.log('toy aki');
        return data;
      });
    });
  }
}
