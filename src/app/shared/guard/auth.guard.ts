import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
	constructor(public auth: AuthService, public router: Router) {}

	canLoad(): boolean {
		if (!this.auth.isAuthenticated()) {
			this.router.navigate([ 'login' ]);
			return false;
		}
		return true;
	}

	canActivate(): boolean {
		if (!this.auth.isAuthenticated()) {
			this.router.navigate([ 'login' ]);
			return false;
		}
		return true;
	}

	canActivateChild(): boolean {
		if (!this.auth.isAuthenticated()) {
			this.router.navigate([ 'login' ]);
			return false;
		}
		return true;
	}
}
