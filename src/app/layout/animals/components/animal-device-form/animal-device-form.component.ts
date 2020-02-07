import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../../../devices/devices.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { routerTransition } from '../../../../router.animations';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';

@Component({
	selector: 'app-animal-device-form',
	templateUrl: './animal-device-form.component.html',
	styleUrls: [ './animal-device-form.component.scss' ],
	animations: [ routerTransition() ]
})
export class AnimalDeviceFormComponent implements OnInit {
	deviceForm: FormGroup;
	startDate: string;
	devices: any[];
	@Input() animal_devices: any[];
	device_cols = [ 'device_reference', 'start_at', 'end_at', 'comment' ];
	showDeviceForm: boolean = false;
	closedAlertDevice: boolean = false;
	addDeviceError: boolean = false;
	@Input() editMode: boolean;

	constructor(
		private deviceService: DeviceService,
		private dateParser: NgbDateParserFormatter,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		if (!this.animal_devices) this.animal_devices = [];

		this.deviceForm = this.fb.group({
			device: [ null, Validators.required ],
			start_at: [ '', Validators.required ],
			end_at: [ { value: '', disabled: true } ],
			comment: [ '' ]
		});

		this.deviceForm.controls['start_at'].statusChanges.subscribe(() => {
			if (this.deviceForm.controls['start_at'].value) {
				this.startDate = this.deviceForm.controls['start_at'].value;
				this.deviceForm.controls['end_at'].clearValidators();
				this.deviceForm.controls['end_at'].enable();
			}
		});

		this.deviceService.get().then((devices) => {
			this.devices = devices;
		});
	}

	onAddDevice() {
		this.showDeviceForm = true;
	}

	onSaveDevice(deviceTodAdd) {
		if (this.deviceForm.valid) {
			deviceTodAdd.device_reference = deviceTodAdd.device.reference;
			deviceTodAdd.device_id = deviceTodAdd.device.id;
			deviceTodAdd.start_at = this.dateParser.format(deviceTodAdd.start_at);
			if (deviceTodAdd.end_at) deviceTodAdd.end_at = this.dateParser.format(deviceTodAdd.end_at);
			let device_exist = this.animal_devices.find((item) => {
				return item.device_id == deviceTodAdd.device_id;
			});
			if (device_exist) {
				this.addDeviceError = true;
				this.closedAlertDevice = false;
			} else {
				delete deviceTodAdd.device;
				this.animal_devices.push(deviceTodAdd);
				this.deviceForm.reset();
				this.showDeviceForm = false;
				this.closedAlertDevice = true;
				this.deviceForm.controls['end_at'].disable();
			}
		}
	}

	onEditDevice(deviceToEdit: any) {
		let indexDevice = this.devices.findIndex((device) => {
			return device.id == deviceToEdit.device_id;
		});

		this.deviceForm.patchValue({
			device: this.devices[indexDevice],
			start_at: this.dateParser.parse(deviceToEdit.start_at),
			end_at: this.dateParser.parse(deviceToEdit.end_at),
			comment: deviceToEdit.comment
		});
		this.showDeviceForm = true;
	}

	onDeleteDevice(deviceToDelete: any) {
		this.animal_devices = _.remove(this.animal_devices, (device: any) => {
			return deviceToDelete.device_reference != device.device_reference;
		});
	}

	onCancelAddDevice() {
		this.deviceForm.reset();
		this.showDeviceForm = false;
		this.closedAlertDevice = true;
		this.deviceForm.controls['end_at'].disable();
	}
}
