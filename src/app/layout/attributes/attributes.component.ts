import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AttributesService } from './attributes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-attributes',
	templateUrl: './attributes.component.html',
	styleUrls: [ './attributes.component.scss' ],
	animations: [ routerTransition() ]
})
export class AttributesComponent implements OnInit {
	animals = [];
	cols = [ 'id_attribute', 'attribute', 'value_list', 'attribute_type', 'order' ];
	attributes;
	currentItem;
	modelRef;
	constructor(private attributesService: AttributesService, private modalService: NgbModal) {}

	ngOnInit() {
		this.setAttributes();
	}

	open(content, item) {
		this.modelRef = this.modalService.open(content, { windowClass: 'confirm-delete-modal', centered: true });
		this.currentItem = item;
	}

	confirm() {
		this.attributesService.delete(this.currentItem).then(() => {
			this.setAttributes();
			this.modelRef.close();
		});
	}

	setAttributes() {
		this.attributesService.get().then((data) => {
			this.attributes = data;
		});
	}

	ngOnDestroy(): void {
		if (this.modelRef) this.modelRef.close();
	}
}
