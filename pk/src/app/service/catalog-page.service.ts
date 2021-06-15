import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthBasicService} from './auth-basic.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogPageService {

  private baseUrl = 'http://localhost:8080';
  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,
              private authBasic: AuthBasicService) {
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, customer,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }

  updateCustomer(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}`, value,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }

  deleteAllCustomers(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users`,
      {headers: this.authBasic.createAuthorizationHeader(this.header, null, null)});
  }
}
