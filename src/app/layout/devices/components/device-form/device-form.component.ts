import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../devices.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  device_types;
  sub; id; device;
  constructor(
      private router: Router,
      private deviceService: DeviceService,
      private route: ActivatedRoute,
      private toastr: ToastrService
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
      // Get current dive id from parms and set form
      this.sub = this.route.params.subscribe(params => {
          this.id = + params['id']; // (+) converts string 'id' to a number
          if ( this.id ) {
              this.deviceService.get_by_id(this.id).then(device => {
                  this.device = device;
                  this.setDeviceFrom();
              }, error => {
                  console.log(error);
              });
          }else{
              this.device = null;
              this.reset();
          }
      });
  }
    save(){
        const formData = this.deviceForm.getRawValue();
        if ( this.device )
            formData.id = this.device.id
        const srvMethod: Promise<any> = !this.device ? this.deviceService.post(formData) : this.deviceService.patch(formData);
        srvMethod.then(data => {
            this.router.navigate(['/devices']);
        }, error => {
            console.log(error);
            this.toastr.error('Attention!', 'Merci de remplir les champs correctement!');
        });

    }
    reset(){
        this.deviceForm.reset();
    }
    setDeviceFrom() {
        this.deviceForm.patchValue(this.device);

    }

}
