import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AppService} from "./app.service";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

declare var $;

@Injectable()
export class ImgurService {
   public token: any;
   private clientId = 'fd6a24a6d80d25f';
    constructor(private http: Http, private appService: AppService) {
      this.token = this.extractToken(document.location.hash);
    }

    uploadImage(fileUrl: any) {
      let auth;
      if (this.token) auth = 'Bearer ' + this.token;
      else auth = 'Client-ID ' + this.clientId;

      let uploadImageToImgur: Promise<any> = new Promise((resolve, reject) => {
          $.ajax({
            url: 'https://api.imgur.com/3/image',
            type: 'POST',
            headers: {
              Authorization: auth,
              Accept: 'application/json'
            },
            data: {
              image: fileUrl,
              type: 'base64'
            },
            success: function(result) {
              let id = result.data.id;
              console.log('URL de la imagen: ' + id);
              resolve(id);
            }
          });
        })
        return Promise.all([uploadImageToImgur])
    }

    extractToken(hash) {
      var match = hash.match(/access_token=(\w+)/);
      return !!match && match[1];
    }
}
