import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { AppService } from '../../services/app.service';

declare var QB;

interface ValuePair {
    first: string;
    second: string;
}

@Component({
  selector: 'event-list',
  templateUrl: 'template.html',
})
export class PeopleList {
  private map: any  ;
  public peopleArray: { id: number, name: string }[] = [{id : 0, name: 'Test'}];

  constructor(
    private nav: NavController,
    navParams: NavParams,
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.map = 'chuo';
  }

  ionViewDidLoad() {
    this.getUserList();
  }

  getUserList() {
    console.log('chuo');
    QB.users.listUsers({ order:'desc'+'string'+'full_name'}, function(error, response){
      if(error) {
        console.log(error);
      } else {
        //console.log(response);
        console.log('wtf1');
        console.log(response.items.length);
        for (var i = 0; i < response.items.length; i++) {
          console.log('wtf2');
          var item = {id: response.items[i].user.id, name: response.items[i].user.login};
          this.peopleArray.push(item);
          //console.log(this.peopleArray);
          console.log('wtf3');
        }
      }
    });
  }
}
