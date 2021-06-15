import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {UserModel} from '../model/user.model';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthBasicService implements HttpInterceptor {

  constructor() {
  }

  createAuthorizationHeader(password, login) {
    //TODO podpiac po prawdziwe dane
    let headers = new HttpHeaders();
    if (!password || !login) {
      console.log('Lack of auth!')
      const user: UserModel = this.getUser();
      //password = user.password;
      //login = user.login;
    }
    password = 'admin';
    login = 'admin';
    console.log(password + login)
    let auth = 'Authorization: ' + 'Basic ' + btoa(login + ':' + password);
    headers = headers.set(`Authorization`, `Basic ` +
      btoa(login + `:` + password));
    headers = headers.set(`Content-Type`, `application/json`);
    console.log(headers.keys());
    console.log('Authorization: Basic YWRtaW46YWRtaW4=')
    console.log(auth)
    return headers;
  }

  getUser(): UserModel {
    return JSON.parse(localStorage.getItem('login'));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this.getUser();
    console.log(currentUser)
    //TODO default here
    req = req.clone({
      setHeaders: {
        Authorization: `Basic YWRtaW46YWRtaW4=`
      }
    });

    console.log(req)
    return next.handle(req);
  }

}
