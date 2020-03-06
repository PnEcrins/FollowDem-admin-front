import { Component, OnInit } from '@angular/core';
import { TypeDeviceService } from '../../type-devices.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-type-device-form',
	templateUrl: './type-device-form.component.html',
	styleUrls: [ './type-device-form.component.scss' ]
})
export class TypeDeviceFormComponent implements OnInit {
	typeDeviceForm: FormGroup;
	device_types;
	sub;
	id;
	type_device;
	constructor(
		public router: Router,
		private typeDeviceService: TypeDeviceService,
		private route: ActivatedRoute,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.typeDeviceForm = new FormGroup({
			device_type: new FormControl('')
		});
		// Get current dive id from parms and set form
		this.sub = this.route.params.subscribe((params) => {
			this.id = +params['id']; // (+) converts string 'id' to a number
			if (this.id) {
				this.typeDeviceService.get_by_id(this.id).then(
					(type_device) => {
						this.type_device = type_device;
						this.setTypeDeviceFrom();
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				this.type_device = null;
				this.reset();
			}
		});
	}
	save() {
		if (this.typeDeviceForm.valid) {
			const formData = this.typeDeviceForm.getRawValue();
			formData.device_type.toLowerCase();
			formData.device_type = formData.device_type.trim();
			if (this.type_device) formData.id_device_type = this.type_device.id_device_type;
			const srvMethod: Promise<any> = !this.type_device
				? this.typeDeviceService.post(formData)
				: this.typeDeviceService.patch(formData);
			srvMethod.then(
				() => {
					this.router.navigate([ '/type-devices' ]);
				},
				(error) => {
					let errors = error.error.error.errors;
					if (errors.find((err) => err.name == 'attribute_already_exists')) {
						this.typeDeviceForm.controls['device_type'].setErrors({ type_already_exists: true });
					} else this.toastr.error('server_error');
				}
			);
		}
	}
	reset() {
		this.typeDeviceForm.reset();
	}
	setTypeDeviceFrom() {
		this.typeDeviceForm.patchValue(this.type_device);
	}
}
