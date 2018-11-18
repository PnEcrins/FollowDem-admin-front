import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceService} from '../../../devices/devices.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalsService} from '../../animals.service';
import {routerTransition} from '../../../../router.animations';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-animal-device-form',
  templateUrl: './animal-device-form.component.html',
  styleUrls: ['./animal-device-form.component.scss'],
  animations: [routerTransition()]
})
export class AnimalDeviceFormComponent implements OnInit {
   @Input() animal;
   @Input() animal_device;
   @Output() changed = new EventEmitter<any>();
   devices;
   animalDeviceForm: FormGroup;
  constructor(private deviceService: DeviceService,
              private animalsService: AnimalsService,
              private toastr: ToastrService) { }

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
      if(this.animal_device)
          this.setAnimalDeviceFrom();
  }
    toDate(date): String {
        if( (typeof date === "object") && (date !== null) )
            return new Date('' + date.year + '-' + date.month + '-' + date.day).toISOString();
        return date;
    }
    setAnimalDeviceFrom() {
        this.animalDeviceForm.get('device_id').setValue(this.animal_device.device.id);
        this.animalDeviceForm.get('comment').setValue(this.animal_device.comment);
        this.animalDeviceForm.get('start_at').setValue({
            year: new Date(this.animal_device.start_at).getFullYear(),
            month: new Date(this.animal_device.start_at).getMonth() + 1,
            day: new Date(this.animal_device.start_at).getDate(),
        });
        this.animalDeviceForm.get('end_at').setValue({
            year: new Date(this.animal_device.end_at).getFullYear(),
            month: new Date(this.animal_device.end_at).getMonth() + 1,
            day: new Date(this.animal_device.end_at).getDate(),
        });


    }
    save() {
        const formData = this.animalDeviceForm.getRawValue();
        formData.start_at = this.toDate(this.animalDeviceForm.controls['start_at'].value);
        formData.end_at = this.toDate(this.animalDeviceForm.controls['end_at'].value);
        formData.animal_id = this.animal.id;
        if(this.animal_device)
            formData.id = this.animal_device.id
        this.animalsService.post_animal_device(formData).then(data => {
            this.changed.emit(data);
        }, error => {
            console.log(error);
            this.changed.emit({ animal: this.animal, error: 'error' });
            this.toastr.error('Attention!', 'Un animal peut avoir seulement un dispositif de même type dans une période!');
        });
    }
    cancel() {
        this.changed.emit({animal: this.animal, error: 'cancelDevice' });
    }

}
