import {Component} from "@angular/core";
import {AppService} from "../../services/app.service";

declare var QB;

@Component({
    selector: 'event-list',
    templateUrl: 'template.html',
})
export class PeopleList {
    public peopleArray: Promise<any[]>;

    constructor(public appService: AppService) {
        this.peopleArray = this.getUserList()
    }

    ionViewDidLoad() {
    }

    getUserList(): Promise<any[]> {
        let params = {order:"asc+login", per_page: 100};

        return new Promise((resolve, reject) => {
            QB.users.listUsers(params, function (error, response) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(response.items.map(user => ({login: user.user.login})));
                }
            });
        });
    }
}
