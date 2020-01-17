import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'animals', pathMatch: 'prefix' },
            { path: 'animals', loadChildren: () => import('./animals/animals.module').then(m => m.AnimalsModule) },
            { path: 'devices', loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule) },
            { path: 'attributes', loadChildren: () => import('./attributes/attributes.module').then(m => m.AttributesModule) },
            { path: 'type-devices', loadChildren: () => import('./type-devices/type-devices.module').then(m => m.TypeDeviceModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
