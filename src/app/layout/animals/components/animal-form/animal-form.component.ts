import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalsService } from '../../animals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {
	CustomDatepickerI18nService,
	CustomDateParserFormatter
} from '../../../../shared/services/custom-datepicker-i18n.service';
import _ from 'lodash';
import * as moment from 'moment';

@Component({
	selector: 'app-animal-form',
	templateUrl: './animal-form.component.html',
	styleUrls: [ './animal-form.component.scss' ],
	providers: [
		{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
	]
})
export class AnimalFormComponent implements OnInit {
	animalForm: FormGroup;
	id: number;
	animal: any;
	startDate: string;
	animal_devices: any;
	animal_attributes: any;
	add_devices: any;
	add_attributes: any;

	constructor(
		private animalsService: AnimalsService,
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private dateParser: NgbDateParserFormatter,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.animalForm = this.fb.group({
			name: [ null, Validators.required ],
			birth_year: [
				null,
				{
					validators: [ Validators.required, Validators.pattern('^(19|20)\\d{2}$') ],
					updateOn: 'blur'
				}
			],
			capture_date: [ null, Validators.required ],
			death_date: [ { value: null, disabled: true } ],
			comment: [ null ]
		});

		this.animalForm.controls['capture_date'].statusChanges.subscribe(() => {
			if (this.animalForm.controls['capture_date'].value) {
				this.startDate = this.animalForm.controls['capture_date'].value;
				this.animalForm.controls['death_date'].clearValidators();
				if (this.animalForm.enabled) this.animalForm.controls['death_date'].enable();
			}
		});

		// Get current dive id from parms and set form
		this.id = this.route.snapshot.params['id'];
		if (this.id) {
			this.animalsService.get_by_id(this.id).then(
				(animal) => {
					this.animal = animal;
					this.animal.capture_date = moment(this.animal.capture_date).format('DD/MM/YYYY');
					if (this.animal.death_date)
						this.animal.death_date = moment(this.animal.death_date).format('DD/MM/YYYY');
					this.animal_devices = animal.animal_devices;
					this.animal_attributes = animal.animal_attributes;
					this.animal_devices.forEach((item) => {
						item.reference = item.device.reference;
						item.start_at = moment(item.start_at).format('DD/MM/YYYY');
						if (item.end_at) item.end_at = moment(item.end_at).format('DD/MM/YYYY');
					});
					this.animal_attributes.forEach((item) => {
						item.attribute_name = item.attribute.name;
						item.id = item.attribute.id;
					});
					this.add_devices = _.cloneDeep(this.animal_devices);
					this.add_attributes = _.cloneDeep(this.animal_attributes);
					this.setAnimalFrom();
				},
				(error) => {
					console.log(error);
				}
			);
		} else {
			this.animal = null;
			this.animalForm.reset();
		}
	}

	setAnimalFrom() {
		this.animalForm.patchValue(this.animal);

		this.animalForm.get('capture_date').setValue(this.dateParser.parse(this.animal.capture_date));
		this.animalForm.get('death_date').setValue(this.dateParser.parse(this.animal.death_date));
	}

	toDate(date): String {
		if (typeof date === 'object' && date !== null)
			return new Date('' + date.year + '-' + date.month + '-' + date.day).toISOString();
		return date;
	}

	onSave() {
		let dataToSend: any = {};
		if (this.animalForm.valid) {
			const formData = this.animalForm.getRawValue();
			formData.birth_year = this.animalForm.controls['birth_year'].value;
			if (formData.capture_date)
				formData.capture_date = this.dateParser.format(this.animalForm.controls['capture_date'].value);
			if (formData.death_date)
				formData.death_date = this.dateParser.format(this.animalForm.controls['death_date'].value);
			if (this.animal) formData.id = this.animal.id;
			dataToSend.animal = formData;
			if (this.add_devices) {
				this.add_devices.forEach((device) => {
					if (device.device) {
						device.device_id = device.device.id;
						delete device.device;
					}
					delete device.reference;
				});
			}
			dataToSend.devices = this.add_devices;
			if (this.add_attributes) {
				this.add_attributes.forEach((attribute) => {
					if (attribute.attributeSelect) {
						attribute.attribute_id = attribute.attributeSelect.id;
						delete attribute.attributeSelect;
					}
					if (attribute.attribute) {
						attribute.attribute_id = attribute.attribute.id;
						delete attribute.attribute;
					}
					delete attribute.id;
					delete attribute.attribute_name;
				});
			}
			dataToSend.attributes = this.add_attributes;
			const srvMethod: Promise<any> = !this.animal
				? this.animalsService.post(dataToSend)
				: this.animalsService.patch(dataToSend);
			srvMethod.then(
				() => {
					this.router.navigate([ '/animals' ]);
				},
				(error) => {
						window.scroll(0, 0);
						let errors = error.error.error.errors;
						if (errors.find((err) => err.name == 'attribute_already_exists')) {
							console.log('in');
							
							this.animalForm.controls['name'].setErrors({ animal_already_exists: true });
						}
						else this.toastr.error('server_error');
				}
			);
		} else {
			window.scroll(0, 0);
			this.toastr.error('Attention!', 'Merci de remplir les champs correctement!');
		}
	}

	onAddDevice(event) {
		this.add_devices = _.cloneDeep(event);
	}

	onAddAttributes(event) {
		this.add_attributes = [];
		this.add_attributes = _.cloneDeep(event);
	}
}
