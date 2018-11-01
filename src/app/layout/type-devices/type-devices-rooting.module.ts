import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeDeviceComponent} from './type-device.component';
import {TypeDeviceFormComponent} from './components/type-device-form/type-device-form.component';

const routes: Routes = [
    {
        path: '',
        component: TypeDeviceComponent
    },
    {
        path: 'type-device-form',
        component: TypeDeviceFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypeDevicesRoutingModule {}
