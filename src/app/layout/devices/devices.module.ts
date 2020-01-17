import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import {DevicesRoutingModule} from './devices-rooting.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
      DevicesRoutingModule,
      TranslateModule,
      ReactiveFormsModule,
      NgbModule,
  ],
  declarations: [DevicesComponent, DeviceFormComponent]
})
export class DevicesModule { }
