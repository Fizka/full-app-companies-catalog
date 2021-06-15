import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageDetailsComponent} from './components/dashboard-details/page-details.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {LoginComponent} from './components/logowanie/login.component';
import {UserListComponent} from './components/users/user-list.component';
import {LogoutGuard} from './auth-guard/logout.guard';
import {AdminGuard} from './auth-guard/admin.guard';
import {UserGuard} from './auth-guard/user.guard';

const routes: Routes = [
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: 'pages', component: DashboardComponent},
  {path: 'page/add', component: PageDetailsComponent, canActivate: [UserGuard], data: {typWidoku: 'add'}},
  {path: 'page/edit/:id', component: PageDetailsComponent, canActivate: [AdminGuard], data: {typWidoku: 'edit'}},
  {path: 'page/:id', component: PageDetailsComponent, canActivate: [AdminGuard], data: {typWidoku: 'details'}},
  {path: 'users', component: UserListComponent},
  {path: 'signUp', component: UserDetailsComponent, data: {typWidoku: 'signUp'}},
  {path: 'user/edit/:username', component: UserDetailsComponent, canActivate: [UserGuard], data: {typWidoku: 'edit'}},
  {path: 'user/profile', component: UserDetailsComponent, canActivate: [UserGuard], data: {typWidoku: 'profile'}},
  {path: 'user/profile/:username', component: UserDetailsComponent, canActivate: [UserGuard], data: {typWidoku: 'details'}},
  {path: 'user/add', component: UserDetailsComponent, data: {typWidoku: 'add'}},
  {path: 'signUp', component: UserDetailsComponent, canActivate: [LogoutGuard], data: {typWidoku: 'add'}},
  {path: 'login', component: LoginComponent, canActivate: [LogoutGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
