import {Component} from "@angular/core";
import {AlertController, NavController, NavParams, MenuController, ToastController} from "ionic-angular";
import {Geolocation, Contacts} from "ionic-native";
import {Conversation} from "../conversation/pages";
import {Settings} from "../settings/pages";
import {EventList} from "../event-list/pages";
import {Sensors} from "../sensors/pages";
import {BrocolitoPage} from "../brocolito-page/pages";
import {PeopleList} from "../people-list/pages";
import {DevelopersPage} from "../developers-page/pages";
import {PrivacySettings} from "../privacy/pages";
import {AppService} from "../../services/app.service";
import {EmailJSService} from "../../services/emailjs.service";

declare var QB;
declare var annyang;

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
        , public toastCtrl: ToastController
        , public emailJSctrl: EmailJSService) {

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
            );

        let self = this
        let commands = {
            'show brocolito': function () {
                self.navCtrl.push(BrocolitoPage);
            },
            'show developers': function () {
                self.navCtrl.push(DevelopersPage);
            },
            'show events': function () {
                self.navCtrl.push(EventList)
            },
            'show session': function () {
                self.navCtrl.push(Settings);
            },
            'show people': function () {
               self.navCtrl.push(PeopleList)
            },
            'show sensors': function () {
               self.navCtrl.push(Sensors)
            },
            'invite friends': function () {
                // TODO: DO it
                //$('#showMenuBtn').click();
            }
        };

        if (annyang) {
            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start();
        }
        else {
            console.log("Voice fail");

        }
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
    }

    seePeopleChat() {
    }

    inviteFriends() {
      let contactsfound
      Contacts.pickContact().then((contacts) => {
        contactsfound = contacts;
        for(var i=0; i<contactsfound.length; i++) {
            let contactEmail = contactsfound[i].emails[0].value; // Contact saved email
            if(contactEmail != null) {
                this.emailJSctrl.sendEmail("phonechat@phonechat.com", contactsfound[i].displayName, contactEmail);
            }
        }
        this.createInfoDialog("You've invited all your device contacts to use PhoneChat. Thank you!!!");
      })

      if (contactsfound.length == 0)
        alert('No Contacts found');
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
      this.menu.close()
      this.navCtrl.push(PrivacySettings);
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
