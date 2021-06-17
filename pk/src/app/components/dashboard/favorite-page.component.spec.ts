import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginService} from '../../service/login.service';
import {of} from 'rxjs';
import {AppUserService} from '../../service/app-user.service';
import {AppModule} from '../../app.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FavoritePageComponent} from './favorite-page.component';
import {AgGridModule} from 'ag-grid-angular';
import {By} from '@angular/platform-browser';
import {RowNode} from 'ag-grid-community';

describe('FavoritePageComponent', () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;
  let appUserServiceSpy;
  let loginServiceSpy;

  const addToFavourite = (data) => {
    component.favorite = !component.favorite;
    const index = component.rowData.favorite.findIndex(row => row === data.idCatalogPage);
    component.favorite === false ? component.rowData.favorite.push(data.idCatalogPage) : component.rowData.favorite.splice(index, 1);
    appUserServiceSpy.updateFavouritesCustomer(data.idCatalogPage).subscribe();
  };

  beforeEach(async(() => {
    appUserServiceSpy = MockHelper.appUserServiceMock;
    loginServiceSpy = MockHelper.loginServiceMock;

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule.withRoutes([]),
        AgGridModule.withComponents([FavoritePageComponent]),
        AppModule
      ],
      providers: [
        {provide: AppUserService, useValue: appUserServiceSpy},
        {provide: LoginService, useValue: loginServiceSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePageComponent);
    component = fixture.componentInstance;
    component.agInit({
      context: TestBed.createComponent(FavoritePageComponent).componentInstance,
      data: catalogModel,
      node: new RowNode(),
      $scope: undefined,
      addRenderedRowListener(eventType: string, listener: any): void {
      },
      api: undefined,
      colDef: undefined,
      column: undefined,
      columnApi: undefined,
      eGridCell: undefined,
      eParentOfValue: undefined,
      formatValue(value: any): any {
      },
      getValue(): any {
      },
      refreshCell(): void {
      },
      rowIndex: 0,
      setValue(value: any): void {
      },
      value: undefined,
      valueFormatted: undefined
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty heart button when no user', () => {
    component.rowData = undefined;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.getAttribute('class')).toContain('btn-favorite-blank');
  });

  describe('should check component when logged user', () => {
    beforeEach(() => {
      component.rowData = userModel;
      component.rowData.favorite = [];
      fixture.detectChanges();
    });
    it('should render filled heart button when user have favourites', fakeAsync(() => {
      addToFavourite(catalogModel);
      tick();
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button.getAttribute('class')).toContain('btn-favorite-added');
    }));
  });
});

class MockHelper {
  static get loginServiceMock() {
    const loginServiceMock = jasmine.createSpyObj('LoginService', [
      'getId'
    ]);
    loginServiceMock.getId.and.returnValue(1);
    return loginServiceMock;
  }

  static get appUserServiceMock() {
    const appUserServiceMock = jasmine.createSpyObj('LoginService', [
      'getCustomer', 'updateFavouritesCustomer'
    ]);

    appUserServiceMock.updateFavouritesCustomer.and.callFake(
      () => {
        const newUser = userModel;
        newUser.status = 'BLOCKED';
        return of(newUser);
      }
    );
    appUserServiceMock.getCustomer.and.returnValue(of(userModel));
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
  favorite: [1, 2],
  status: 'ACTIVE'
};

const catalogModel = {
  idCatalogPage: 1,
  title: 'title',
  description: 'description',
  companyName: 'companyName',
  owner: 'firstname lastname',
  status: 'ACTIVE',
  creationDate: new Date('2016-03-02'),
};
