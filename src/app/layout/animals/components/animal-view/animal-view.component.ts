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
	device_cols = [ 'id', 'device', 'start_at', 'end_at', 'comment' ];
	attribute_cols = [ 'id', 'attribute_name', 'value' ];
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
					this.animalForm.patchValue(this.animal);
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
