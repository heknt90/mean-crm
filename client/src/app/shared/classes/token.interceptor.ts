import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        return next.handle(request)
    }
}