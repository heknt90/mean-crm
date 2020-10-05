import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        return next.handle(request).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<HttpEvent<any>>  {
        if (error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    sessionFailed: true
                }
            })
        }
        return throwError(error)
    }
}