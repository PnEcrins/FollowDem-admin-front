import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../devices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-device-form',
	templateUrl: './device-form.component.html',
	styleUrls: [ './device-form.component.scss' ]
})
export class DeviceFormComponent implements OnInit {
	deviceForm: FormGroup;
	device_types;
	sub;
	id;
	device;
	constructor(
		public router: Router,
		private deviceService: DeviceService,
		private route: ActivatedRoute,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.deviceForm = new FormGroup({
			ref_device: new FormControl(null, Validators.required),
			device_type: new FormControl(null, Validators.required),
			comment: new FormControl(null)
		});
		this.deviceService.get_device_types().then((data) => {
			this.device_types = data;
		});
		// Get current dive id from parms and set form
		this.sub = this.route.params.subscribe((params) => {
			this.id = +params['id']; // (+) converts string 'id' to a number
			if (this.id) {
				this.deviceService.get_by_id(this.id).then(
					(device) => {
						this.device = device;
						this.setDeviceFrom();
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				this.device = null;
				this.reset();
			}
		});
	}

	save() {
		if (this.deviceForm.valid) {
			const formData = this.deviceForm.getRawValue();
			formData.ref_device.toLowerCase();
			formData.ref_device = formData.ref_device.trim();
			formData.id_device_type = formData.device_type.id_device_type;
			delete formData.device_type;
			if (this.device) formData.id_device = this.device.id_device;
			const srvMethod: Promise<any> = !this.device
				? this.deviceService.post(formData)
				: this.deviceService.patch(formData);
			srvMethod.then(
				(data) => {
					this.router.navigate([ '/devices' ]);
				},
				(error) => {
					let errors = error.error.error.errors;
					if (errors.find((err) => err.name == 'device_already_exists')) {
						this.deviceForm.controls['ref_device'].setErrors({ device_already_exists: true });
					} else this.toastr.error('server_error');
				}
			);
		}
	}

	reset() {
		this.deviceForm.reset();
	}
	
	setDeviceFrom() {
		let indexDevice = this.device_types.findIndex((type) => {
			return type.id_device_type == this.device.device_type.id_device_type;
		});
		this.deviceForm.patchValue({
			ref_device:this.device.ref_device,
			device_type: this.device_types[indexDevice],
			comment: this.device.comment
		})
	}
}
