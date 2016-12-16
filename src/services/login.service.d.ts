import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppService } from './app.service';
export declare class LoginService {
    private http;
    private app;
    constructor(http: Http, app: AppService);
    login(userName: string, password: string): Promise<[Response, any]>;
}
