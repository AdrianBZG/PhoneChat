import { Http } from '@angular/http';
import { AppService } from './app.service';
export declare class SignupService {
    private http;
    private appService;
    emailReg: RegExp;
    constructor(http: Http, appService: AppService);
    signup(userName: string, name: string, lastName: string, password: string, passwordRetype: string, email: string): Promise<[void, any]>;
    signupQuickBlox(name: string, password: string): Promise<any>;
}
