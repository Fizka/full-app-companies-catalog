import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthBasicService implements HttpInterceptor {

  constructor() {
  }

  createAuthorizationHeader(password?, login?) {
    let headers = new HttpHeaders();
    let auth: string;
    auth = (password && login) ? `Basic ` + btoa(login + `:` + password) : this.getAuthorization();
    if (auth !== null) {
      headers = headers.set(`Authorization`, auth);
    }
    return headers;
  }

  getAuthorization(): string {
    return localStorage.getItem('authorization');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getAuthorization()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.getAuthorization(),
          'Content-Type': `application/json`
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': `application/json`
        }
      });
    }

    return next.handle(req);
  }

}

export const httpHeadersProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthBasicService, multi: true}
];
