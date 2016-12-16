import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import { AppService } from '../../services/app.service';
import { EventList } from '../event-list/pages';

@Component({
  selector: 'sensors',
  templateUrl: 'template.html',
})
export class Sensors {
  public latitude: any;
  public longitude: any;
  private number: any = 0;
  private timer;

  constructor(
    private navCtrl: NavController,
    navParams: NavParams,
    private menu: MenuController,
    public appService: AppService
  ) {
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.timer = setInterval(() => Geolocation.getCurrentPosition().then((geoposition) => {
      this.number += 10;
      this.latitude = geoposition.coords.latitude;
      this.longitude = geoposition.coords.longitude;
    }), 500);
    /*Geolocation.getCurrentPosition().then((geoposition) => {
      this.latitude = geoposition.coords.latitude;
      this.longitude = geoposition.coords.longitude;
    });*/
  }

  eventListPage() {
    this.navCtrl.push(EventList)
  }
}



// export class Sensors {
//   GPSdata: String = ""
//   mymap: any;
//   marker:any;
//   currentLatitude;
//   currentLongitude;

//   /**
//    * This class controll the diferents chat that an user can access.
//    */
//   constructor(
//       public navCtrl: NavController
//     , public navParams: NavParams
//     , public menu: MenuController
//     , public alertCtrl: AlertController
//     , public appService: AppService) {
//   }


//   initializeGenericMap() {
//     if(this.mymap == undefined) {
//       var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//       var osmAttrib = 'Map @ PhoneChat';
//       var osm = L.tileLayer(osmUrl);

//       // Get GPS position
//       Geolocation.getCurrentPosition().then((geoposition) => {
//         this.mymap = L.map('mapid').setView([geoposition.coords.latitude, geoposition.coords.longitude], 15);
//         this.mymap.addLayer(osm);
//         this.marker = L.marker([geoposition.coords.latitude, geoposition.coords.longitude]).addTo(this.mymap);
//         this.marker.bindPopup("<b>You are here!</b>").openPopup();
//         this.mymap.invalidateSize();
//       });


//       // Update button TODO:
//       //$("#toggleMapButton").html('Update map');

//     } else {
//       var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//       var osmAttrib = 'Map @ PhoneChat';
//       var osm = L.tileLayer(osmUrl);

//       this.mymap.addLayer(osm);

//       // Remove the previous marker
//       this.mymap.removeLayer(this.marker);

//       // Get GPS position
//       Geolocation.getCurrentPosition().then((geoposition) => {
//         this.marker = L.marker([geoposition.coords.latitude, geoposition.coords.longitude]).addTo(this.mymap);
//         this.marker.bindPopup("<b>You are here!</b>").openPopup();
//         this.mymap.invalidateSize();
//       });
//     }
//   }
//}
