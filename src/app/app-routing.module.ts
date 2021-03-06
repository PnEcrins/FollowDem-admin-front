import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
		canActivateChild: [ AuthGuard ],
		canActivate: [ AuthGuard ],
		canLoad: [ AuthGuard ]
	},
	{ path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
	{ path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule) },
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
