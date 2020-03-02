import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'animals',
				pathMatch: 'prefix',
				canActivate: [ AuthGuard ],
				canLoad: [ AuthGuard ]
			},
			{
				path: 'animals',
				loadChildren: () => import('./animals/animals.module').then((m) => m.AnimalsModule),
				canActivate: [ AuthGuard ],
				canLoad: [ AuthGuard ]
			},
			{
				path: 'devices',
				loadChildren: () => import('./devices/devices.module').then((m) => m.DevicesModule),
				canLoad: [ AuthGuard ]
			},
			{
				path: 'attributes',
				loadChildren: () => import('./attributes/attributes.module').then((m) => m.AttributesModule),
				canLoad: [ AuthGuard ]
			},
			{
				path: 'type-devices',
				loadChildren: () => import('./type-devices/type-devices.module').then((m) => m.TypeDeviceModule),
				canLoad: [ AuthGuard ]
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class LayoutRoutingModule {}
