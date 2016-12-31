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
  cityName: any = "";

  constructor(private http : Http, private appService : AppService) {}

  getCityName() {
    let personCityName : Promise<any> = new Promise((resolve, reject) => {
        // Get person city name
        Geolocation.getCurrentPosition().then((geoposition) => {
          $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: geoposition.coords.latitude, lon: geoposition.coords.longitude}).then((result) => {
            let toReturn = result.address.city;
            this.cityName = result.address.city;
            resolve(toReturn);
          })
        });
    })
    return Promise.all([personCityName])
  }
}
