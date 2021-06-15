import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-logowanie',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm);
    } else {
      this.openSnackbar();
    }
  }

  openSnackbar() {
    const message = 'Your data is incorrect. Try again';
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
