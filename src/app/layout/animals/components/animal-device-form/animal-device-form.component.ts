import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceService} from '../../../devices/devices.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalsService} from '../../animals.service';
import {routerTransition} from '../../../../router.animations';

@Component({
  selector: 'app-animal-device-form',
  templateUrl: './animal-device-form.component.html',
  styleUrls: ['./animal-device-form.component.scss'],
  animations: [routerTransition()]
})
export class AnimalDeviceFormComponent implements OnInit {
    @Input() animal;
    @Output() changed = new EventEmitter<boolean>();
   devices;
   animalDeviceForm: FormGroup;
  constructor(private deviceService: DeviceService,
              private animalsService: AnimalsService) { }

  ngOnInit() {
      this.animalDeviceForm = new FormGroup({
          device_id: new FormControl('', Validators.required),
          start_at: new FormControl('', Validators.required),
          end_at: new FormControl('', Validators.required),
          comment: new FormControl()
      });
      this.deviceService.get().then(data => {
          this.devices = data;
      });
  }
    toDate(date): String {
        if( (typeof date === "object") && (date !== null) )
            return new Date('' + date.year + '-' + date.month + '-' + date.day).toISOString();
        return date;
    }
    save(){
        const formData = this.animalDeviceForm.getRawValue();
        formData.start_at = this.toDate(this.animalDeviceForm.controls['start_at'].value);
        formData.end_at = this.toDate(this.animalDeviceForm.controls['end_at'].value);
        formData.animal_id = this.animal.id;
        this.animalsService.post_animal_device(formData).then(data => {
            this.changed.emit(data);
        });
    }

}
