import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthBasicService} from './auth-basic.service';
import {UserModel} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private authBasic: AuthBasicService) {
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  getCustomerRole(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/role/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, customer);
  }

  updateCustomer(id: number, value: UserModel): Observable<any> {
    id = id ? id : JSON.parse(localStorage.getItem('userId'));
    return this.http.put(`${this.baseUrl}/user/${id}`, value);
  }

  updateFavouritesCustomer(pageId: number): Observable<any> {
    const id = JSON.parse(localStorage.getItem('userId'));
    return this.http.put(`${this.baseUrl}/user/favourites/${id}`, pageId);
  }

  changeCustomerStatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/block/${id}`, null);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getCustomerByLogin(login: string, password: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/login/${login}`,
      {headers: this.authBasic.createAuthorizationHeader(password, login)});
  }

  deleteAllCustomers(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users`);
  }
}
