import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {AppUserService} from "../../service/app-user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private appUserService: AppUserService) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.loginService.logout();
  }

  isUserLogged(): boolean {
    return this.loginService.isUserLogged();
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

}
