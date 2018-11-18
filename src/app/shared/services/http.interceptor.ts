import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/index';
import { tap, map } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class MyCustomInterceptor implements HttpInterceptor {
    constructor(public inj: Injector, public router: Router,  private toastr: ToastrService) {
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

        request = request.clone({
            withCredentials: true
        });
        return  next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (request.method === 'POST') {
                    this.toastr.success('Success!', '');
                }
            }
        }, error => {
            if (error.statusText === 'FORBIDDEN') {
                this.router.navigate(['/login']);
            }
        }));
    }
}
