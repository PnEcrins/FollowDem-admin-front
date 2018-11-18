import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public casLogin: boolean;

    constructor(public _authService: AuthService) {
    }

    ngOnInit() {
    }
    register(user) {
        this._authService.signinUser(user.username, user.password);
    }
}
