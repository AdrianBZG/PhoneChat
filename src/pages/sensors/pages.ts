import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import * as Leaflet from "leaflet";
import { AppService } from '../../services/app.service';

@Component({
  selector: 'sensors',
  templateUrl: 'template.html',
})
export class Sensors {
  private _latLng: any;
  private marker: any;
  private map: any  ;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private menu: MenuController,
    public appService: AppService
  ) {
    console.log("ffdfasdf");

    console.log(Leaflet);
  }

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
    console.log("HELELELEEL");

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
