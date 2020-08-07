import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../../animals.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-animal-view',
	templateUrl: './animal-view.component.html',
	styleUrls: [ './animal-view.component.scss' ]
})
export class AnimalViewComponent implements OnInit {
	animalForm: FormGroup;

	id;
	animal;
	device_cols = [ 'id_device', 'device', 'date_start', 'date_end', 'comment' ];
	attribute_cols = [ 'id_attribute', 'attribute', 'value' ];
	animal_devices: any;
	animal_attributes: any;

	constructor(private route: ActivatedRoute, private animalsService: AnimalsService, private fb: FormBuilder) {}

	ngOnInit() {
		this.animalForm = this.fb.group({
			name: [ '' ],
			birth_year: [ '' ],
			capture_date: [ '' ],
			death_date: [ '' ],
			comment: [ '' ]
		});
		this.animalForm.disable();
		this.id = this.route.snapshot.params['id'];
		if (this.id) {
			this.animalsService.get_by_id(this.id).then(
				(animal) => {
					this.animal = animal;
					this.animal_devices = animal.animal_devices;
					this.animal_attributes = animal.animal_attributes;
					this.animal_devices.forEach((item) => {
						item.ref_device = item.device.ref_device;
					});

					this.animal_attributes.forEach((item) => {
						item.attribute_name = item.attribute.attribute;
						item.id_attribute = item.attribute.id_attribute;
					});
					this.animalForm.patchValue(this.animal);
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
