import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsService } from '../../animals.service';
import { DeviceService } from '../../../devices/devices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

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
	attribute_cols = [ 'id', 'attribute', 'value' ];
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
					console.log('animmal', animal);
					this.animal = animal;
					this.animal_devices = animal.animal_devices;
                    this.animal_attributes = animal.animal_attributes;
                    this.animalForm.patchValue(this.animal);
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
