import { Component } from "@angular/core";
import { AlertController, NavController, NavParams, MenuController } from "ionic-angular";
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
  private eventArray: any[];
  private markerArray: any[];
  private timer;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private menu: MenuController,
    public alertCtrl: AlertController,
    public appService: AppService,
    public eventService: EventService
  ) {
    this.user = appService.user;
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

    this.timer = setInterval(() => (this.refreshEvents()), 60000);

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


    this.refreshEvents();
  }

  onMapClicked(e) {
    //this.latLng = e.latlng;
    this.newEvent(e.latlng);
  }

  onMarkerPositionChanged(e) {
    //const latlng = e.target.getLatLng();

    //this.latLng = latlng;
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
            console.log(data);
            if(latLng) {
              console.log(latLng.lat);
              console.log(latLng.lng);
              console.log('owner: ' + this.user);
              console.log('participants: ' + this.user);
            } else {
              Geolocation.getCurrentPosition().then((geoposition) => {
                console.log(geoposition.coords.latitude);
                console.log(geoposition.coords.longitude);
                console.log('owner: ' + this.user);
                console.log('participants: ' + this.user);
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  createEvent(name: string, description: string, latitude: string, longitude: string, creator: string, participants: number[], date: Date) {
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
    this.eventService.getEventList().then((array) => {this.eventArray = array;})
  }

  clearEventMarkers() {
    this.markerArray = [];
  }

  /**
  * Refresh the map with the events markers
  */
  refreshEvents() {
    this.clearEventMarkers();
    this.loadEvents();

    let marker = Leaflet
      .marker(this.latLng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);

    this.markerArray.push(marker);
  }
}
