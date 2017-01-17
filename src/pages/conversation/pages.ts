import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, Content, TextInput, Button, LoadingController} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {Camera} from "ionic-native";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/map";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/scan";
import {ConversationService} from "../../services/conversation.service";
import {AppService} from "../../services/app.service";
import {ImgurService} from "../../services/imgur.service";
import {ChatBubbleI} from "../chat-bubble/pages";


/**
 * Represents Controller of a dialog or Chat
 */
@Component({
    selector: 'conversation',
    templateUrl: 'template.html',
    providers: [ConversationService],
})
export class Conversation {
    @ViewChild(Content) content: Content;
    @ViewChild(TextInput) inputMessage: TextInput;
    @ViewChild('sendBtn') sendBtn: Button;
    @ViewChild('attach') attach: Button;

    /**
     * Name of chat
     * @type {string}
     */
    title: String = "";

    /**
     * Last Messages sent to chat
     */
    messages: ChatBubbleI[] = [];

    constructor(public navCtrl: NavController
        , public loadingCtrl: LoadingController
        , public navParams: NavParams
        , public conversationService: ConversationService
        , public appService: AppService
        , public imgurService : ImgurService) {
    }

    /**
     * Load messages
     */
    ionViewDidEnter() {
        let loading = this.loadingCtrl.create({content: "Loading Messages ..."});
        loading.present();

        this.conversationService.messages.subscribe(msgs => {
            if (msgs.length != 0) {
                this.messages = msgs;
                loading.dismiss();
                this.content.scrollToBottom();
            }
        });

        this.title = this.appService.chat.name;

        this.eventSendMsg().subscribe(chatbubble => {
            this.conversationService.messages.next(this.conversationService.messages.getValue().concat(chatbubble))
        })
    }

    ionViewWillLeave() {
        this.conversationService.leave();
    }

    takePicture() {
        Camera.getPicture().then(image => {
            console.log('Test Imagen: ' + image)
            this.imgurService.uploadImage(image).then((result) => console.log('Imagen subida: ' + result));
        })
    }

    openGallery() {
      let cameraOptions = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
      }

      Camera.getPicture(cameraOptions).then(file_uri => {
          console.log('Test Imagen: ' + file_uri)
          this.imgurService.uploadImage(file_uri).then((result) => console.log('Imagen subida: ' + result));
        },
        err => console.log(err));
    }

    /**
     * Get events of send button click and input enter event to produce a message stream
     */
    eventSendMsg(): Observable<ChatBubbleI> {
        let btnEvents = Observable.fromEvent(this.sendBtn.getNativeElement(), "click");

        let inputEvents = Observable.fromEvent(this.inputMessage.getNativeElement(), 'keyup')
            .filter((key: KeyboardEvent) => key.keyCode == 13 && this.inputMessage.value != "");

        //console.log(this.appService.getPhoto(this.conversationService.getUser(this.appService.userId).blob_id));
        return btnEvents
            .merge(inputEvents)
            .filter(_ => this.inputMessage.value !== "")
            .map((ev: any) => {
                let bodyMsg = this.inputMessage.value;
                let dateValue = new Date();
                this.inputMessage.setValue("");
                this.conversationService.sendMessage(bodyMsg);
                console.log("Fine here?")
                return {
                    content: bodyMsg as string
                    , position: 'right'
                    , time: dateValue
                    , senderName: this.appService.user
                    , img: "http://www.free-icons-download.net/images/user-icon-44709.png"
                    , cityName: this.conversationService.userCityName
                }
            });
    }

}
