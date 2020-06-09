import { Component, OnInit } from '@angular/core';
import { DeviceService } from './devices.service';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
	constructor(
		private deviceService: DeviceService,
		private toastr: ToastrService,
		private translate: TranslateService,
		private modalService: NgbModal
	) {}

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
		this.deviceService.delete(this.currentItem).then(
			() => {
				this.setDevices();
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

	ngOnDestroy(): void {
		if (this.modelRef) this.modelRef.close();
	}
}
