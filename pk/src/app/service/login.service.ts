import {Injectable} from '@angular/core';

import {UserModel} from '../model/user.model';
import {FormGroup} from '@angular/forms';
import {AppUserService} from './app-user.service';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private appUserService: AppUserService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  login(dane: FormGroup) {
    let login = dane.get('login').value;
    let password = dane.get('password').value;
    console.log("loading login...")
    console.log(login)
    login = "admin"
    login = "admin"
   this.appUserService.getCustomerByLogin(login, password).subscribe(
     data=>{
       console.log(login)
       localStorage.setItem('login', JSON.stringify(login));
       this.router.navigate(['/']);
     }, error =>{
        console.log(error)
        this.openSnackbar();
     }
   );
  }

  openSnackbar() {
    const message = 'Your data is incorrect. Try again';
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }

  logout(): void {
    localStorage.removeItem('login');
  }

  getUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  getLogin(): UserModel {
    console.log("user:")
    console.log(localStorage.getItem('login'))
    return JSON.parse(localStorage.getItem('login'));
  }

  getId(): number {
    return this.getUser() ? this.getUser().id : null;
  }

  getRole(): string {
    return (JSON.parse(localStorage.getItem('user')) as UserModel).role;
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem('login');
  }

  isAdmin(): boolean {
    //sprawdzanie roli na sztywno
    //TODO podpiac po request
    if (this.isUserLogged()) {
      return (JSON.parse(localStorage.getItem('login'))) === 'admin';
    }
    return false;
  }

  isEqualToId(id: number): boolean {
    return this.getId() === id;
  }
}
