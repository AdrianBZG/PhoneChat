import {Component} from "@angular/core";
import {AlertController, NavController, NavParams, MenuController, ToastController} from "ionic-angular";
import {Geolocation} from "ionic-native";
import {Conversation} from "../conversation/pages";
import {Settings} from "../settings/pages";
import {EventList} from "../event-list/pages";
import {Sensors} from "../sensors/pages";
import {BrocolitoPage} from "../brocolito-page/pages";
import {PeopleList} from "../people-list/pages";
import {DevelopersPage} from "../developers-page/pages";
import {AppService} from "../../services/app.service";

declare var QB;

@Component({
    selector: 'chat',
    templateUrl: 'template.html',
})
export class Chat {
    user: String = "";
    topicChats: DialogMsg[] = [];

    /**
     * This class controll the diferents chat that an user can access.
     */
    constructor(public navCtrl: NavController
        , public navParams: NavParams
        , public menu: MenuController
        , public alertCtrl: AlertController
        , public appService: AppService
        , public toastCtrl: ToastController) {

        this.user = appService.user;
        menu.enable(true);

        this.appService
            .getGroupsDialogs()
            .subscribe(
                (dialogs) => {
                    this.topicChats = dialogs.map((dialog) => {
                        dialog.photo = this.appService.getURLImage(dialog.photo);
                        return dialog;
                    });
                },
                (error) => {
                    console.log("ERROR ON LOAD DIALOGS:");
                    console.log(error);
                    this.navCtrl.pop();
                }
            )
    };

    /**
     * Push new screen with chat selected
     */
    openChat(chat: DialogMsg) {
        this.appService.setCurrentActiveChat(chat);
        this.navCtrl.push(Conversation);
    }

    // Create a one-to-one chat
    newIndividualChat() {
        let prompt = this.alertCtrl.create({
            title: 'Create a one-to-one chat',
            message: "Enter the ID of the person to chat with",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
                {
                    name: 'personid',
                    placeholder: 'Person ID'
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
                        let params = {
                            type: 3,
                            name: data.name,
                            occupants_ids: [data.personid]
                        };

                        QB.chat.dialog.create(params, function (err, createdDialog) {
                            if (err) {
                                console.log(err);
                            } else {
                                this.createInfoDialog('One-to-One chat created');
                                this.appService.getGroupsDialogs();
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    // Create a new global chat
    newGlobalChat() {
        let prompt = this.alertCtrl.create({
            title: 'Create a new global chat',
            message: "Enter the name of the global chat to create it",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
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
                        let params = {
                            type: 1,
                            name: data.name
                        };

                        QB.chat.dialog.create(params, function (err, createdDialog) {
                            if (err) {
                                console.log(err);
                            } else {
                                this.createInfoDialog('Global chat created');
                                this.appService.getGroupsDialogs();
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    }


    newGroupChat() {
        let prompt = this.alertCtrl.create({
            title: 'Create a new global chat',
            message: "Enter the name of the global chat to create it",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
                {
                    name: 'peopleids',
                    placeholder: 'People IDs (e.g.: 24,56,32)'
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
                        let parsedOccupantsIds = this.appService.commaSeparatedStringToIntArray(data.peopleids);

                        let params = {
                            type: 2,
                            occupants_ids: parsedOccupantsIds,
                            name: data.name
                        };

                        QB.chat.dialog.create(params, function (err, createdDialog) {
                            if (err) {
                                console.log(err);
                            } else {
                                this.createInfoDialog('Group chat created');
                                this.appService.getGroupsDialogs();
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    seeGroupChat() {
        // TODO: Filter topicChats to groups only
    }

    seePeopleChat() {
        // TODO: Filter to person to person chats
    }

    games() {
        //this.navCtrl.push(Sensors)
        console.log("HERE Rudolf's game // it could be access from chat")
    }

    goToBrocolitoPage() {
        this.menu.close();
        this.navCtrl.push(BrocolitoPage);
    }

    eventListPage() {
        this.menu.close()
        this.navCtrl.push(EventList)
    }

    sensorsInfoPage() {
        this.menu.close()
        this.navCtrl.push(Sensors)
    }

    seePeoplePage() {
        this.menu.close()
        this.navCtrl.push(PeopleList)
    }

    /**
     * Go to settings page
     */
    settingsPage() {
        this.menu.close()
        this.navCtrl.push(Settings);
    }

    /**
     * Go to privacy page
     */
    privacyPage() {
        //this.menu.close().then(_ => {this.navCtrl.push(Settings)})
    }

    devInfo() {
      this.menu.close()
      this.navCtrl.push(DevelopersPage);
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
                        if (latLng) {
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

    createInfoDialog(text: string) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    }
}
