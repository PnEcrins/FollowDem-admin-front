import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeDeviceFormComponent } from './components/type-device-form/type-device-form.component';
import { TypeDeviceComponent } from './type-device.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeDevicesRoutingModule } from './type-devices-rooting.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
	imports: [ CommonModule, TypeDevicesRoutingModule, TranslateModule, ReactiveFormsModule, NgbModule,SharedModule ],
  declarations: [ TypeDeviceComponent, TypeDeviceFormComponent ],
})
export class TypeDeviceModule {}
