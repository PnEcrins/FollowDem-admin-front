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
			name: new FormControl('')
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
			formData.name.toLowerCase();
			formData.name = formData.name.trim();
			if (this.type_device) formData.id = this.type_device.id;
			const srvMethod: Promise<any> = !this.type_device
				? this.typeDeviceService.post(formData)
				: this.typeDeviceService.patch(formData);
			srvMethod.then(
				(data) => {
					this.router.navigate([ '/type-devices' ]);
				},
				(error) => {
					let errors = error.error.error.errors
					if (errors.find((err) => err.name =="attribute_already_exists"))
						{	this.typeDeviceForm.controls['name'].setErrors({'type_already_exists': true});
					}
					else
					this.toastr.error('server_error');
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
