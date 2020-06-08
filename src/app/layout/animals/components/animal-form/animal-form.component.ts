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
	startCaptureDate: any;
	now: any;

	constructor(
		private animalsService: AnimalsService,
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private dateParser: NgbDateParserFormatter,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.now = this.dateParser.parse(moment().format('DD/MM/YYYY'));
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

		this.animalForm.controls['birth_year'].valueChanges.subscribe((value) => {
			if (this.animalForm.controls['birth_year'].value) {
				this.startCaptureDate = { year: value, month: 1, day: 1 };
				this.animalForm.controls['capture_date'].reset();
				this.animalForm.controls['death_date'].reset();
			}
		});

		this.animalForm.controls['capture_date'].statusChanges.subscribe(() => {
			if (this.animalForm.controls['capture_date'].value) {
				this.startDate = this.animalForm.controls['capture_date'].value;
				this.animalForm.controls['death_date'].reset();
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
						item.ref_device = item.device.ref_device;
						item.id_device = item.device.id_device;
						item.date_start = moment(item.date_start).format('DD/MM/YYYY');
						if (item.date_end) item.date_end = moment(item.date_end).format('DD/MM/YYYY');
					});
					this.animal_attributes.forEach((item) => {
						item.attribute_name = item.attribute.attribute;
						item.id_attribute = item.attribute.id_attribute;
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
			if (this.animal) formData.id_animal = this.animal.id_animal;
			dataToSend.animal = formData;
			if (this.add_devices) {
				this.add_devices.forEach((device) => {
					if (device.device) {
						device.id_device = device.device.id_device;
						delete device.device;
					}
					delete device.ref_device;
				});
			}
			dataToSend.devices = this.add_devices;
			if (this.add_attributes) {
				this.add_attributes.forEach((attribute) => {
					if (attribute.attributeSelect) {
						attribute.id_attribute = attribute.attributeSelect.id_attribute;
						delete attribute.attributeSelect;
					}
					if (attribute.attribute) {
						attribute.id_attribute = attribute.attribute.id_attribute;
						delete attribute.attribute;
					}

					delete attribute.attribute;
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
						this.animalForm.controls['name'].setErrors({ animal_already_exists: true });
					} else this.toastr.error('server_error', '', { closeButton: true, disableTimeOut : true });
				}
			);
		} else {
			window.scroll(0, 0);
			this.toastr.error('Attention!', 'Merci de remplir les champs correctement!', {
				closeButton: true,
				disableTimeOut : true 
			});
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
