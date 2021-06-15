import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormsHelper} from '../../helpers/forms.helper';
import {LoginService} from '../../service/login.service';
import {MatSnackBar} from '@angular/material';
import {AppUserService} from '../../service/app-user.service';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userForm: FormGroup;
  helper = new FormsHelper();
  editMode = false;
  viewMode: string;
  confirmPassword = new FormControl('', Validators.required);
  username: string;
  translation: string[][] = this.helper.translateUser();
  versionOfTranslation = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              public snackBar: MatSnackBar,
              private appUserService: AppUserService) {
    this.route.data.subscribe(data => {
      this.viewMode = data.typWidoku;
    });
  }

  ngOnInit() {
    let id: number;
    if (this.viewMode === 'details' || this.viewMode === 'edit') {
      id = history.state.uzytkownikId;
    } else if (this.viewMode === 'profile') {
      id = this.loginService.getId();
      this.versionOfTranslation = 1;
    }
    this.userForm = this.helper.generateFormForUser(this.viewDetails);

    if (this.viewSignUpMode) {
      this.userForm.setValidators(passwordValidation(this.confirmPassword));
      this.confirmPassword.valueChanges
        .subscribe(() => this.userForm.updateValueAndValidity());
    }

    if (id !== undefined) {
      this.editMode = true;
      let bodyOfUser: UserModel;
      this.appUserService.getCustomer(id)
        .subscribe(data => {
        bodyOfUser = data;
      });
      this.helper.setUserValues(bodyOfUser, this.userForm);
      this.username = this.userForm.get('username').value;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.editMode) {
        this.appUserService.updateCustomer(this.helper.getUserModel(this.userForm).id, this.helper.getUserModel(this.userForm))
          .subscribe(data => console.log(data));
        this.goToMode();
      } else {
        this.appUserService.createCustomer(this.helper.getUserModel(this.userForm))
          .subscribe(data => console.log(data));
        this.goToMode();
      }
    } else {
      this.openSnackbar();
    }
  }

  get viewDetails(): boolean {
    return this.viewMode === 'details' || this.viewMode === 'profile';
  }

  get isEditModeOn(): boolean {
    return this.loginService.isEqualToId(this.userForm.get('id').value) ||
      this.loginService.isAdmin();
  }

  get viewSignUpMode(): boolean {
    return this.viewMode === 'add' || this.viewMode === 'signUp';
  }

  get title(): string {
    if (this.viewMode === 'signUp') {
      return `SIGN UP USER`;
    } else if (this.viewMode === 'add') {
      return `ADD USER`;
    } else if (this.viewMode === 'edit') {
      return `EDIT USER  ${this.username}`;
    }
    return `PROFILE  ${this.userForm.get('username').value}`;
  }

  get buttonContent(): string {
    if (this.viewMode === 'edit') {
      return `CONFIRM`;
    } else if (this.viewMode === 'add') {
      return `ADD`;
    }
    return `SIGN UP`;
  }

  get isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  editProfile(): void {
    const username: string = this.userForm.get('username').value;
    const id: string = this.userForm.get('id').value;
    this.router.navigate([`/user/edit/${username}`], {state: {userId: id}});
  }

  deleteProfile(): void {
    this.appUserService.deleteCustomer(this.userForm.get('id').value)
      .subscribe(data => console.log(data));
    if (this.isAdmin) {
      // powinien przekierować na listę userów
      this.router.navigate(['users']);
    } else {
      this.loginService.logout();
      this.router.navigate(['/']);
    }
  }

  private goToMode(): void {
    if (this.isAdmin) {
      const username = this.userForm.get('username').value;
      const id = this.userForm.get('id').value;
      this.router.navigate([`/user/profile/${username}`], {state: {userId: id}});
    } else {
      if (this.editMode) {
        this.router.navigate(['user/profile']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  openSnackbar() {
    const message = 'You need to fill all inputs.';
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}

export function passwordValidation(confirmation: AbstractControl): ValidatorFn {
  return (control: FormGroup): { [key: string]: boolean } | null => {
    const isequalToPassword = control.get('password').value === confirmation.value;
    return !isequalToPassword ? {passwordIsNotEqual: true} : null;
  };
}
