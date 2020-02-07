import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalsService } from '../../animals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18nService } from '../../../../shared/services/custom-datepicker-i18n.service';
import _ from 'lodash';

@Component({
	selector: 'app-animal-form',
	templateUrl: './animal-form.component.html',
	styleUrls: [ './animal-form.component.scss' ],
	providers: [ { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService } ]
})
export class AnimalFormComponent implements OnInit {
	animalForm: FormGroup;
	id: number;
	animal: any;
	startDate: string;
	animal_devices: any;

	constructor(
		private animalsService: AnimalsService,
		private dateParser: NgbDateParserFormatter,
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private toastr: ToastrService
	) {
	}

	ngOnInit() {
		this.animalForm = this.fb.group({
			name: [ '', Validators.required ],
			birth_year: [ '', Validators.required ],
			capture_date: [ '', Validators.required ],
			death_date: [ { value: '', disabled: true } ],
			comment: [ '' ]
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
					this.animal_devices = animal.animal_devices;
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
		this.animalForm.get('capture_date').setValue({
			year: new Date(this.animal.capture_date).getFullYear(),
			month: new Date(this.animal.capture_date).getMonth() + 1,
			day: new Date(this.animal.capture_date).getDate()
		});
		this.animalForm.get('death_date').setValue({
			year: new Date(this.animal.death_date).getFullYear(),
			month: new Date(this.animal.death_date).getMonth() + 1,
			day: new Date(this.animal.death_date).getDate()
		});
	}

	toDate(date): String {
		if (typeof date === 'object' && date !== null)
			return new Date('' + date.year + '-' + date.month + '-' + date.day).toISOString();
		return date;
	}

	save() {
		const formData = this.animalForm.getRawValue();
		formData.birth_year = this.toDate(this.animalForm.controls['birth_year'].value);
		formData.capture_date = this.toDate(this.animalForm.controls['capture_date'].value);
		formData.death_date = this.toDate(this.animalForm.controls['death_date'].value);
		if (this.animal) formData.id = this.animal.id;
		const srvMethod: Promise<any> = !this.animal
			? this.animalsService.post(formData)
			: this.animalsService.patch(formData);
		srvMethod.then(
			(data) => {
				this.router.navigate([ '/animals' ]);
			},
			(error) => {
				console.log(error);
				this.toastr.error('Attention!', 'Merci de remplir les champs correctement!');
			}
		);
	}
}
