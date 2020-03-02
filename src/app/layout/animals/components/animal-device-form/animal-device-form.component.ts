import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DeviceService } from '../../../devices/devices.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { routerTransition } from '../../../../router.animations';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { AnimalsService } from '../../animals.service';

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
	device_cols = [ 'reference', 'start_at', 'end_at', 'comment' ];
	showDeviceForm: boolean = false;
	closedAlertDevice: boolean = false;
	alertMsg: string;
	addDeviceError: boolean = false;
	@Input() viewMode: boolean;
	@Output() added_device = new EventEmitter<any>();
	editDevice: boolean = false;
	deviceToEdit: any;

	constructor(
		private deviceService: DeviceService,
		private animalsService: AnimalsService,
		private dateParser: NgbDateParserFormatter,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		if (!this.animal_devices) this.animal_devices = [];
		this.deviceForm = this.fb.group({
			device: [ null, Validators.required ],
			start_at: [ null, Validators.required ],
			end_at: [ { value: null, disabled: true } ],
			comment: [ null ]
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

	onSaveDevice(deviceOnSave) {
		if (this.deviceForm.valid) {
			this.animalsService.device_available(deviceOnSave.device.id).then(
				(devId) => {
					if (devId.length > 0)
					{
						this.addDeviceError = true;
						this.alertMsg = "device_used_by_another_animal";
						this.closedAlertDevice = false;
					}
					else {
						// on Edit device
					if (this.editDevice) {
						// find and update device
						let indexDevice = this.animal_devices.findIndex((device) => {
							return device.device_id == this.deviceToEdit.device_id;
						});
						this.deviceToEdit.start_at = this.dateParser.format(deviceOnSave.start_at);
						this.deviceToEdit.comment = deviceOnSave.comment;
						if (deviceOnSave.end_at) {
							this.deviceToEdit.end_at = this.dateParser.format(deviceOnSave.end_at);
						} else {
							this.deviceToEdit.end_at = null;
						}
						this.animal_devices[indexDevice] = this.deviceToEdit;
						// reset attributre form and init value
						this.deviceForm.reset();
						this.editDevice = false;
						this.showDeviceForm = false;
						this.deviceForm.controls['device'].enable();
						this.deviceForm.controls['end_at'].disable();
						this.deviceToEdit = null;
						this.added_device.emit(this.animal_devices); // event update animal_device
					} else {
						// on add new device
						deviceOnSave.reference = deviceOnSave.device.reference;
						deviceOnSave.device_id = deviceOnSave.device.id;
						deviceOnSave.start_at = this.dateParser.format(deviceOnSave.start_at);
						if (deviceOnSave.end_at) deviceOnSave.end_at = this.dateParser.format(deviceOnSave.end_at);
						let device_exist = this.animal_devices.find((item) => {
							return item.device_id == deviceOnSave.device_id;
						});
						
						// check if device is already added
						if (device_exist) {
							this.addDeviceError = true;
							this.alertMsg = "device_already_add";
							this.closedAlertDevice = false;
						} else {
							delete deviceOnSave.device;
							this.animal_devices.push(deviceOnSave);
							// reset device form and init value
							this.deviceForm.reset();
							this.showDeviceForm = false;
							this.closedAlertDevice = true;
							this.deviceForm.controls['end_at'].disable();
							this.added_device.emit(this.animal_devices); // event new animal_device
						}
					}
					}
					
				},
				(err) => console.log('err', err)
			);
		}
	}

	onEditDevice(deviceToEdit: any) {
		this.editDevice = true;
		this.deviceToEdit = deviceToEdit;
		let indexDevice = this.devices.findIndex((device) => {
			return device.id == deviceToEdit.device_id;
		});

		this.deviceForm.patchValue({
			device: this.devices[indexDevice],
			start_at: this.dateParser.parse(deviceToEdit.start_at),
			end_at: this.dateParser.parse(deviceToEdit.end_at),
			comment: deviceToEdit.comment
		});
		this.deviceForm.controls['device'].disable();
		this.showDeviceForm = true;
	}

	onDeleteDevice(deviceToDelete: any) {
		this.animal_devices = _.remove(this.animal_devices, (device: any) => {
			return deviceToDelete.reference != device.reference;
		});
		this.added_device.emit(this.animal_devices);
	}

	onCancelAddDevice() {
		this.deviceForm.reset();
		this.showDeviceForm = false;
		this.closedAlertDevice = true;
		this.editDevice = false;
		this.deviceForm.controls['end_at'].disable();
		this.deviceForm.controls['device'].enable();
		this.deviceToEdit = null;
	}
}
