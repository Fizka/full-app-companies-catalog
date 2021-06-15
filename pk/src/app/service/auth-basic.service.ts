import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {UserModel} from '../model/user.model';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthBasicService {

  constructor() {
  }

  createAuthorizationHeader(headers: HttpHeaders, password, login) {
    if (!password || !login) {
      const user: UserModel = this.getUser();
      //password = user.password;
      //login = user.login;
      password = 'admin';
      login = 'admin';
    }
    console.log(password + login)
    headers.append('Authorization', 'Basic ' +
      btoa(login + ':' + password));
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  getUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

}
