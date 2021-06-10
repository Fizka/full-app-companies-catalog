import {Injectable} from '@angular/core';

import {UserModel} from '../model/user.model';
import {FormGroup} from '@angular/forms';
import {AppUserService} from './app-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private appUserService: AppUserService) {
  }

  login(dane: FormGroup): boolean {
    const user = this.appUserService.getCustomerByLogin(dane.get('login').value, dane.get('password').value);
    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUsers(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  getId(): number {
    return this.getUsers() ? this.getUsers().id : null;
  }

  getRole(): string {
    return (JSON.parse(localStorage.getItem('user')) as UserModel).role;
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem('user');
  }

  isAdmin(): boolean {
    if (this.isUserLogged()) {
      return (JSON.parse(localStorage.getItem('user')) as UserModel).role === 'ADMIN';
    }
    return false;
  }

  isEqualToId(id: number): boolean {
    return this.getId() === id;
  }
}
