import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices.component';
import {DeviceFormComponent} from './components/device-form/device-form.component';

const routes: Routes = [
    {
        path: '',
        component: DevicesComponent
    },
    {
        path: 'device-form',
        component: DeviceFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {}
