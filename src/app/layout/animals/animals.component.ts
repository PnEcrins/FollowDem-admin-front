import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AnimalsService } from './animals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
		private toastr: ToastrService,
		private translate: TranslateService,
		private spinner: NgxSpinnerService
	) {
		this.setAnimals();
	}

	open(content, item) {
		this.modelRef = this.modalService.open(content, { windowClass: 'confirm-delete-modal', centered: true });
		this.currentItem = item;
	}

	confirm() {
		this.animalService.delete(this.currentItem).then(
			(data) => {
				this.setAnimals();
				this.modelRef.close();
			},
			(err) => {
				let error_msg: string;
				this.translate.get(err.error.msg).subscribe((msg) => {
					error_msg = msg;
					this.toastr.error(error_msg, '', {
						closeButton: true,
						disableTimeOut: true
					});
				});
			}
		);
	}
	ngOnInit() {}

	setAnimals(key = '') {
		this.spinner.show();
		this.animalService.get(key).then(
			(data) => {
				const keys = [ 'name', 'birth_year', 'capture_date', 'death_date' ];
				this.cols = keys;
				this.animals = data;
				this.animals.forEach((animal) => {
					if (animal.capture_date) animal.capture_date = moment(animal.capture_date).format('DD/MM/YYYY');
					if (animal.death_date) animal.death_date = moment(animal.death_date).format('DD/MM/YYYY');
				});

				this.spinner.hide();
			},
			(error) => {
				this.spinner.hide();
				console.log(error);
			}
		);
	}

	onAnimalView(id): void {
		this.router.navigate([ '/animals/animal-form/' + id ], { state: { viewMode: true } });
	}

	ngOnDestroy(): void {
		if (this.modelRef) this.modelRef.close();
	}
}
