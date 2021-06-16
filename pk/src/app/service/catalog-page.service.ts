import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getPage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/page/${id}`);
  }

  createPage(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/page`, customer);
  }

  updatePage(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/page/${id}`, value);
  }

  deletePage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/page/${id}`);
  }

  getPagesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pages`);
  }

  deleteAllPages(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pages`);
  }
}
