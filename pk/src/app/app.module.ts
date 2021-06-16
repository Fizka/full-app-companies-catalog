import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageDetailsComponent} from './components/dashboard-details/page-details.component';
import {FooterComponent} from './page/footer/footer.component';
import {MenuComponent} from './page/menu/menu.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {LoginComponent} from './components/logowanie/login.component';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {HeaderComponent} from './page/header/header.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FavoritePageComponent} from './components/dashboard/favorite-page.component';
import {UserListComponent} from './components/users/user-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {httpHeadersProvider} from './service/auth-basic.service';
import {httpErrorInterceptorProvider} from './service/errors-interceptor.spec';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    PageDetailsComponent,
    FooterComponent,
    HeaderComponent,
    FavoritePageComponent,
    UserDetailsComponent,
    LoginComponent,
    UserListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    AgGridModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [HttpClientModule, httpHeadersProvider, httpErrorInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [FavoritePageComponent]
})
export class AppModule {
}
