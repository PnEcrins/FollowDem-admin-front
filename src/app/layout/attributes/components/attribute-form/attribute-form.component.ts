import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../../devices/devices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributesService } from '../../attributes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-attribute-form',
	templateUrl: './attribute-form.component.html',
	styleUrls: [ './attribute-form.component.scss' ]
})
export class AttributeFormComponent implements OnInit {
	attributeForm: FormGroup;
	sub;
	id;
	attribute;
	constructor(
		public router: Router,
		private attributesService: AttributesService,
		private route: ActivatedRoute,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.attributeForm = new FormGroup({
			attribute: new FormControl('', Validators.required),
			value_list: new FormControl('', Validators.required),
			attribute_type: new FormControl('', Validators.required),
			order: new FormControl('', Validators.required)
		});
		// Get current dive id from parms and set form
		this.sub = this.route.params.subscribe((params) => {
			this.id = +params['id']; // (+) converts string 'id' to a number
			if (this.id) {
				this.attributesService.get_by_id(this.id).then(
					(attribute) => {
						this.attribute = attribute;
						this.setAttributeFrom();
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				this.attribute = null;
				this.reset();
			}
		});
	}
	reset() {
		this.attributeForm.reset();
	}
	setAttributeFrom() {
		this.attributeForm.patchValue(this.attribute);
	}
	save() {
		if (this.attributeForm.valid) {
			const formData = this.attributeForm.getRawValue();
			formData.attribute.toLowerCase();
			formData.attribute = formData.attribute.trim();
			if (this.attribute) formData.id_attribute = this.attribute.id_attribute;
			const srvMethod: Promise<any> = !this.attribute
				? this.attributesService.post(formData)
				: this.attributesService.patch(formData);
			srvMethod.then(
				() => {
					this.router.navigate([ '/attributes' ]);
				},
				(error) => {
					let errors = error.error.error.errors;
					if (errors.find((err) => err.name == 'attribute_already_exists')) {
						this.attributeForm.controls['attribute'].setErrors({ attirbute_already_exists: true });
					}
					if (errors.find((err) => err.name == 'order_already_exists')) {
						this.attributeForm.controls['order'].setErrors({ order_already_exists: true });
					} else this.toastr.error('server_error');
				}
			);
		}
	}
}
