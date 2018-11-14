import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'animals', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'animals', loadChildren: './animals/animals.module#AnimalsModule' },
            { path: 'devices', loadChildren: './devices/devices.module#DevicesModule' },
            { path: 'attributes', loadChildren: './attributes/attributes.module#AttributesModule' },
            { path: 'type-devices', loadChildren: './type-devices/type-devices.module#TypeDeviceModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
