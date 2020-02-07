import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AnimalsService } from './animals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
	selector: 'app-animals',
	templateUrl: './animals.component.html',
	styleUrls: [ './animals.component.scss' ],
	animations: [ routerTransition() ]
})
export class AnimalsComponent implements OnInit {
	animals = [];
	cols = [];
	currentItem;
	modelRef;
	constructor(
		private animalService: AnimalsService,
		private router: Router,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService
	) {
		this.setAnimals();
	}

	open(content, item) {
		this.modelRef = this.modalService.open(content);
		this.currentItem = item;
	}
	confirm(key) {
		this.animalService.delete(this.currentItem).then((data) => {
			console.log(data);
			this.setAnimals();
			this.modelRef.close();
		});
	}
	ngOnInit() {}

	setAnimals(key = '') {
		this.spinner.show();
		this.animalService.get(key).then(
			(data) => {
				const keys = [ 'name', 'birth_year', 'capture_date', 'death_date' ];
				this.cols = keys;
				this.animals = data;
				this.spinner.hide();
			},
			(error) => {
				this.spinner.hide();
				console.log(error);
			}
		);
	}

	onAnimalView(id): void {
		this.router.navigate(["/animals/animal-form/" + id], { state: { viewMode : true} });
	}
}
