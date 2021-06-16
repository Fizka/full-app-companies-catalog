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

  login(data: FormGroup) {
    const login = data.get('login').value;
    const password = data.get('password').value;
    this.appUserService.getCustomerByLogin(login, password).subscribe(
     userData => {
       localStorage.setItem('userId', JSON.stringify(userData.idAppUser));
       localStorage.setItem('role', JSON.stringify(userData.role));
       localStorage.setItem('authorization', `Basic ` + btoa(login + `:` + password));
       this.router.navigate(['/']);
     }, error => {
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
    localStorage.removeItem('userId');
    localStorage.removeItem('authorization');
    this.router.navigateByUrl(`/`).then(() => window.location.reload());
  }

  getId(): number {
    return JSON.parse(localStorage.getItem('userId'));
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem('userId');
  }

  isAdmin(): boolean {
    if (this.isUserLogged()) {
      const role = JSON.parse(localStorage.getItem('role'));
      if (role) {
        return role === 'ADMIN';
      }
    }
    return false;
  }

  isEqualToId(id: number): boolean {
    return this.getId() === id;
  }
}
