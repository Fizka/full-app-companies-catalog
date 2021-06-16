import {UserDetailsComponent} from './user-details.component';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {of} from 'rxjs';
import {AppUserService} from '../../service/app-user.service';
import {AppModule} from '../../app.module';
import {MatSnackBar} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockRouter;
  let appUserServiceSpy;
  let loginServiceSpy;
  let snackBarManagerSpy;

  beforeEach(async(() => {
    mockRouter = MockHelper.routerMock;
    appUserServiceSpy = MockHelper.appUserServiceMock;
    loginServiceSpy = MockHelper.loginServiceMock;
    snackBarManagerSpy = MockHelper.snackBarManagerMock;

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule.withRoutes([]),
        AppModule
      ],
      providers: [
        { provide: AppUserService, useValue: appUserServiceSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: MatSnackBar, useValue: snackBarManagerSpy },
        { provide: ActivatedRoute, useValue: {
            data: of({typWidoku: 'details'}),
          }
        },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    window.history.pushState({ userId: 1}, '', '');
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should check component for admin and details view', () => {
    beforeEach(() => {
      component.userForm.get('status').setValue('ACTIVE');
      fixture.detectChanges();
    });

    it('should display block button for unblocked customer', (done: DoneFn) => {
      const button = fixture.debugElement.query(By.css('#block-user'));
      expect(button).toBeTruthy();
      done();
    });

    it('should display block button for blocked customer', fakeAsync(() => {
      component.blockProfile();
      tick();
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('#unblock-user'));
      expect(button).toBeTruthy();
    }));

    it('should not render submit button for details view', () => {
      const button = fixture.debugElement.query(By.css('#details-btn'));
      expect(button).toBeFalsy();
    });

    it('should render permissions control for admin', () => {
      const button = fixture.debugElement.query(By.css('#permission'));
      expect(button).toBeTruthy();
    });
  });

  describe('should check component for admin and add view', () => {
    beforeEach(() => {
      component.viewMode = 'add';
      fixture.detectChanges();
    });
    it ('should display passwords inputs', () => {
      const password = fixture.debugElement.query(By.css('#password'));
      expect(password).toBeTruthy();
      const confirmPassword = fixture.debugElement.query(By.css('#password'));
      expect(confirmPassword).toBeTruthy();
    });
    it ('should navigate with correct params', fakeAsync(() => {
      component.userForm = userForm;
      component.onSubmit();
      const username = component.userForm.get('username').value;
      tick();
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/user/profile/${username}`], {state: {userId: 1}});
    }));
  });

});

class MockHelper {
  static get routerMock() {
    return {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve()),
    };
  }

  static get loginServiceMock() {
    const loginServiceMock = jasmine.createSpyObj('LoginService', [
      'getId', 'isEqualToId', 'isAdmin', 'logout'
    ]);

    loginServiceMock.getId.and.returnValue(1);
    loginServiceMock.isEqualToId.and.returnValue(false);
    loginServiceMock.isAdmin.and.returnValue(true);
    return loginServiceMock;
  }

  static get appUserServiceMock() {
    const appUserServiceMock = jasmine.createSpyObj('LoginService', [
      'getCustomer', 'updateCustomer', 'createCustomer', 'changeCustomerStatus', 'deleteCustomer'
    ]);

    appUserServiceMock.getCustomer.and.returnValue(of(userModel));
    appUserServiceMock.updateCustomer.and.returnValue(of(userModel));
    appUserServiceMock.createCustomer.and.returnValue(of(userModel));
    appUserServiceMock.changeCustomerStatus.and.callFake(
      () => {
        const newUser = userModel;
        newUser.status = 'BLOCKED';
        return of(newUser);
      }
    );
    appUserServiceMock.deleteCustomer.and.returnValue(of(null));
    return appUserServiceMock;
  }

  static get snackBarManagerMock() {
    return jasmine.createSpyObj('SnackBarManager', ['open']);
  }
}

const userModel = {
  idAppUser: 1,
  login: 'login',
  password: 'password',
  role: 'USER',
  username: 'username',
  firstname: 'firstname',
  lastname: 'lastname',
  favorite: [1, 2],
  status: 'ACTIVE'
};

const userForm = new FormGroup({
  id: new FormControl({value: '', disabled: false}),
  login: new FormControl({value: 'login', disabled: false}, Validators.required),
  password: new FormControl({value: 'password', disabled: false}, Validators.required),
  username: new FormControl({value: 'username', disabled: false}, Validators.required),
  firstname: new FormControl({value: 'firstname', disabled: false}, Validators.required),
  lastname: new FormControl({value: 'lastname', disabled: false}, Validators.required),
  status: new FormControl({value: 'ACTIVE', disabled: false}),
  role: new FormControl({value: 'USER', disabled: false}),
});
