import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DeviceService} from '../../devices.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  device_types;
  constructor(
      private router: Router,
      private deviceService: DeviceService
  ) { }

  ngOnInit() {
      this.deviceForm = new FormGroup({
          reference: new FormControl('', Validators.required),
          device_type_id: new FormControl('', Validators.required),
          comment: new FormControl('')
      });
      this.deviceService.get_device_types().then(data => {
          this.device_types = data;
          console.log(data);
      });
  }
    save(){
        const formData = this.deviceForm.getRawValue();
        this.deviceService.post(formData).then(data => {
            this.router.navigate(['/devices']);
        });

    }

}
