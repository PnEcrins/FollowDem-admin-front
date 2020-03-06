import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TypeDeviceService } from './type-devices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-type-device',
	templateUrl: './type-device.component.html',
	styleUrls: [ './type-device.component.scss' ],
	animations: [ routerTransition() ]
})
export class TypeDeviceComponent implements OnInit {
	cols = [];
	type_devices;
	currentItem;
    modelRef;
    
	constructor(
        private typeDeviceService: TypeDeviceService,
        private modalService: NgbModal
        ) {}

	ngOnInit() {
		this.getTypeDevices();
	}

	getTypeDevices() {
		this.typeDeviceService.get().then((data) => {
			const keys = [ 'id_device_type', 'device_type' ];
			this.cols = keys;
			this.type_devices = data;
		});
	}

	open(content, item) {
		this.modelRef = this.modalService.open(content, { windowClass: 'confirm-delete-modal', centered: true });
		this.currentItem = item;
	}

	confirm() {
		this.typeDeviceService.delete(this.currentItem).then(() => {
			this.getTypeDevices();
			this.modelRef.close();
		});
	}

	ngOnDestroy(): void {
		if (this.modelRef) this.modelRef.close();
	}
}
