import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      const content_type = 'application/x-www-form-urlencoded';
      const request = req.clone({
        headers: req.headers.set('Content-Type', content_type),
        body: 'my body'
      });

      return next.handle(request);
    }
  }
}
