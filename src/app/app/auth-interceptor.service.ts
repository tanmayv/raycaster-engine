import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('username');
    if (username) {
      console.log('adding user to request');
      // const authReq = req.clone({
      //   headers: req.headers.set('user', currentUser.username)
      // });
      return next.handle(req.clone({
        params : req.params.set('loggedInUser', username)
      }));
    } else {
      return next.handle(req);
    }
  }
}
