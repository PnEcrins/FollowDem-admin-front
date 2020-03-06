import { Component, OnInit } from '@angular/core';
import { DeviceService } from './devices.service';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-devices',
	templateUrl: './devices.component.html',
	styleUrls: [ './devices.component.scss' ],
	animations: [ routerTransition() ]
})
export class DevicesComponent implements OnInit {
	animals = [];
	cols = [];
	devices;
	currentItem;
	modelRef;
	constructor(private deviceService: DeviceService, private modalService: NgbModal) {}

	ngOnInit() {
		this.setDevices();
	}
	setDevices(key = '') {
		this.deviceService.get(key).then((data) => {
			const keys = [ 'ref_device', 'id_device', 'type', 'comment' ];
			this.cols = keys;
			this.devices = data;
			this.devices.forEach((device) => {
				device.type = device.device_type.device_type;
			});
		});
	}

	open(content, item) {
		this.modelRef = this.modalService.open(content, { windowClass: 'confirm-delete-modal', centered: true });
		this.currentItem = item;
	}

	confirm() {
		this.deviceService.delete(this.currentItem).then(() => {
			this.setDevices();
			this.modelRef.close();
		});
	}

	ngOnDestroy(): void {
		if (this.modelRef) this.modelRef.close();
	}
}
