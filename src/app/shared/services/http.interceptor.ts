import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/index';
import { map, filter, tap } from 'rxjs/operators';
@Injectable()
export class MyCustomInterceptor implements HttpInterceptor {
    constructor(public inj: Injector, public router: Router) {
    }

    private handleError(error: Response | any) {
        console.log(error);
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.inj.get(AuthService);
        //if (!auth.getToken()) {
            //this.router.navigate(['/login']);
        //}
        request = request.clone({
            withCredentials: true
        });

        return next.handle(request);
    }
}
