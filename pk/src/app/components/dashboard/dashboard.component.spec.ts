import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginService} from '../../service/login.service';
import {of} from 'rxjs';
import {AppModule} from '../../app.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {CatalogPageService} from '../../service/catalog-page.service';
import {AppUserService} from '../../service/app-user.service';
import {By} from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let catalogPageServiceSpy;
  let loginServiceSpy;
  let appUserServiceSpy;

  beforeEach(async(() => {
    catalogPageServiceSpy = MockHelper.catalogPageServiceMock;
    loginServiceSpy = MockHelper.loginServiceMock;
    appUserServiceSpy = MockHelper.appUserServiceMock;

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule.withRoutes([]),
        AppModule
      ],
      providers: [
        { provide: AppUserService, useValue: appUserServiceSpy },
        { provide: CatalogPageService, useValue: catalogPageServiceSpy },
        { provide: LoginService, useValue: loginServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display navbar buttons when logged as admin', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(buttons.length).toEqual(2);
  });
});

class MockHelper {

  static get loginServiceMock() {
    const loginServiceMock = jasmine.createSpyObj('LoginService', [
      'getId', 'isEqualToId', 'isAdmin', 'logout'
    ]);

    loginServiceMock.getId.and.returnValue(1);
    loginServiceMock.isEqualToId.and.returnValue(false);
    loginServiceMock.isAdmin.and.returnValue(true);
    return loginServiceMock;
  }

  static get catalogPageServiceMock() {
    const catalogPageServiceMock = jasmine.createSpyObj('CatalogPageService', [
      'getPagesList',
    ]);

    catalogPageServiceMock.getPagesList.and.returnValue(of(pagesCatalog));
    return catalogPageServiceMock;
  }

  static get appUserServiceMock() {
    const appUserServiceMock = jasmine.createSpyObj('LoginService', [
      'getCustomer', 'updateFavouritesCustomer'
    ]);

    appUserServiceMock.getCustomer.and.returnValue(of(userModel));
    appUserServiceMock.updateFavouritesCustomer.and.callFake(() => {
      const newUser = userModel;
      newUser.favorite.push(2);
      return of(newUser);
    });
    return appUserServiceMock;
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
  favorite: [1],
  status: 'ACTIVE'
};

const pagesCatalog = [[
  {
    idCatalogPage: 1,
    title: 'title',
    description: 'description',
    companyName: 'companyName',
    owner: 'firstname lastname',
    status: 'ACTIVE',
    creationDate: new Date('2016-03-02'),
  },
  {
    idCatalogPage: 2,
    title: 'title2',
    description: 'description2',
    companyName: 'companyName2',
    owner: 'firstname2 lastname2',
    status: 'ACTIVE',
    creationDate: new Date('2016-03-02'),
  }
]];
