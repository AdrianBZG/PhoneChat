import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  constructor(private http : Http, private appService : AppService) {}

  saveEvent(name: string, description: string, latitude: string, longitude: string, creator: string, participants: number[], date: Date) {
    // TO-DO: Date, missing on MongoDB model
    let nameVar = name.trim();
    let descriptionVar = description.trim();
    let latitudeVar = latitude.trim();
    let longitudeVar = longitude.trim();
    let creatorVar = creator.trim();
    let participantsVar = participants;
    let dateVar = date;

    if (nameVar == "") {
      throw new Error("Empty name");
    }
    if (descriptionVar == "") {
      throw new Error("Empty description");
    }
    if (latitudeVar == "") {
      throw new Error("Empty latitude");
    }
    if (longitudeVar == "") {
      throw new Error("Empty longitude");
    }
    if (creatorVar == "") {
      throw new Error("Empty creator");
    }

    return Promise.all([this.http.post(this.appService.getAddEventAPI(),
        { name: nameVar
        , description: descriptionVar
        , latitude: latitudeVar
        , longitude: longitudeVar
        , creator: creatorVar
        , participants: participantsVar
        , date: dateVar
        }
      ).toPromise().then(() => { console.log("crea un evento")})
     ]);
  }

  getEventList() {
    let eventArray : Promise<any[]> =
      this.http
        .get(this.appService.getEventListURL(), {})
        .map((resp) => resp.json() as any []).toPromise();
    return eventArray;
  }
}
