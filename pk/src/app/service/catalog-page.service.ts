import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthBasicService} from './auth-basic.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogPageService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private authBasic: AuthBasicService) {
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/page/${id}`,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/page`, customer,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }

  updateCustomer(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/page/${id}`, value,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/page/${id}`,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pages`,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }

  deleteAllCustomers(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pages`,
      {headers: this.authBasic.createAuthorizationHeader( null, null)});
  }
}
