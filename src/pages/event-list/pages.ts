import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { Geolocation } from 'ionic-native';
import * as Leaflet from "leaflet";
import { AppService } from '../../services/app.service';
import { EventService } from '../../services/event.service';


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
  private user: String = "";
  private userId: Number;
  private eventArray: any[] = [];
  private markerArray: any[] = [];
  private timer = null;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    public alertCtrl: AlertController,
    public appService: AppService,
    public eventService: EventService
  ) {
    this.user = appService.user;
    this.userId = appService.userId;
  }

  set latLng(value) {
    this._latLng = value;
    this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  ionViewDidLoad() {

    this.timer = setInterval(() => (this.loadEvents()), 500);

    Geolocation.getCurrentPosition().then((geoposition) => {
      this._latLng = Leaflet.latLng(geoposition.coords.latitude, geoposition.coords.longitude);

      this.map = Leaflet
        .map("map")
        .setView(this.latLng, 13)
        .on("click", this.onMapClicked.bind(this));

      setTimeout(this.loadMap.bind(this), 100);
    });
  }

  loadMap() {
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }

  onMapClicked(e) {
    this.newEvent(e.latlng);
  }

  onMarkerPositionChanged(e) {
  }

  newEvent(latLng?: any) {
    let prompt = this.alertCtrl.create({
      title: 'Create an event',
      message: "Fill the event data",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'description',
          placeholder: 'Description'
        },
        {
          name: 'date',
          placeholder: 'Date',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Create event clicked');
            if(latLng) {
              this.createEvent(data.name, data.description, latLng.lat, latLng.lng, this.userId, [this.userId], data.date);
            } else {
              Geolocation.getCurrentPosition().then((geoposition) => {
                let latitudeAsString = geoposition.coords.latitude+"";
                let longitudeAsString = geoposition.coords.longitude+"";
                this.createEvent(data.name, data.description, latitudeAsString, longitudeAsString, this.userId, [this.userId], data.date);
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  createEvent(name: string, description: string, latitude: string, longitude: string, creator: Number, participants: Number[], date: Date) {
    try {
      this.eventService.saveEvent(
            name
          , description
          , latitude
          , longitude
          , creator
          , participants
          , date)
          .then((resp) => {
            console.log("Event added, now reloading the map");
            this.loadEvents();
          },
          (err) => { this.showError(err); }
        );
      }
      catch (err) {
        this.showError(err);
      }
  }

  showError(err : string) {
    let alert = this.alertCtrl.create({
        title: 'Invalid input',
        message: err,
        buttons: ['OK']
      });
    alert.present();
  }

  /**
   * Load events from server (MongoDB)
   */
  loadEvents() {
    this.eventService.getEventList().then((array) => {
      this.eventArray = array;
      this.refreshEvents();
    })
  }

  clearEventMarkers() {
    for(var i = 0; i < this.markerArray.length; i++){
      this.map.removeLayer(this.markerArray[i]);
    }
    this.markerArray = [];
  }

  /**
  * Refresh the map with the events markers
  */
  refreshEvents() {
    this.clearEventMarkers();
    for (var i = 0, len = this.eventArray.length; i < len; i++) {
      let marker = Leaflet.marker([this.eventArray[i].latitude, this.eventArray[i].longitude])
                          .addTo(this.map)
                          .bindTooltip('<b>'+this.eventArray[i].name+':</b><br>'+this.eventArray[i].description+'<br>'+this.eventArray[i].date.substr(0,10).replace(/-/g,'/'), {permanent: true, offset: [0, 0] });

      this.markerArray.push(marker);
    }
  }
}
