import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { config } from '../../settings';
import { CookieService } from 'ngx-cookie-service';

export interface User {
    user_login: string;
    id_role: string;
    id_organisme: string;
    prenom_role?: string;
    nom_role?: string;
    nom_complet?: string;
}

@Injectable()
export class AuthService {
    authentified = false;
    currentUser: any;
    token: string;
    loginError: boolean;
    public isLoading = false;
    constructor(private router: Router, private _http: HttpClient, private _cookie: CookieService) {}

    setCurrentUser(user) {
        localStorage.setItem('current_user', JSON.stringify(user));
    }

    getCurrentUser() {
        let currentUser = localStorage.getItem('current_user');
        if (!currentUser) {
            const userCookie = this._cookie.get('current_user');
            if (userCookie !== '') {
                let decodedCookie = this.decodeObjectCookies(userCookie);
                decodedCookie = decodedCookie.split("'").join('"');
                this.setCurrentUser(decodedCookie);
                currentUser = localStorage.getItem('current_user');
            }
        }
        return JSON.parse(currentUser);
    }

    setToken(token, expireDate) {
        this._cookie.set('token', token, expireDate);
    }

    getToken() {
        const token = this._cookie.get('token');
        const response = token.length === 0 ? null : token;
        return response;
    }

    signinUser(username: string, password: string) {

        this.isLoading = true;
        const user = {
            login: username,
            password: password,
            id_application: config.APP_FLW_ID
        };
        this._http
            .post<any>(`${config.serverURL}/auth/login`, user)
            .subscribe(
                data => {
                    const userForFront = {
                        user_login: data.user.identifiant,
                        prenom_role: data.user.prenom_role,
                        id_role: data.user.id_role,
                        nom_role: data.user.nom_role,
                        nom_complet: data.user.nom_role + ' ' + data.user.prenom_role,
                        id_organisme: data.user.id_organisme
                    };
                    this.setCurrentUser(userForFront);
                    this.loginError = false;
                    this.router.navigate(['']);
                    this.isLoading = false;
                },
                error => {
                    this.loginError = true;
                    this.isLoading = false;
                }
            );
    }
    logOut() {

        this._http
            .post<any>(`${config.serverURL}/auth/logout`,{})
            .subscribe(data => {
                }
            );
    }

    decodeObjectCookies(val) {
        if (val.indexOf('\\') === -1) {
            return val; // not encoded
        }
        val = val.slice(1, -1).replace(/\\"/g, '"');
        val = val.replace(/\\(\d{3})/g, function(match, octal) {
            return String.fromCharCode(parseInt(octal, 8));
        });
        return val.replace(/\\\\/g, '\\');
    }

    deleteTokenCookie() {
        document.cookie = 'token=; path=/; expires' + new Date(0).toUTCString();
    }

    logout() {
        this._http
            .post<any>(`${config.serverURL}/auth/logout`, { })
            .subscribe(data => {
                    console.log(data);
                }
            );
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this._cookie.get('token') !== null;
    }
}
