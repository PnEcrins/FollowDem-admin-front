import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../../devices/devices.service';
import {Router} from '@angular/router';
import {AttributesService} from '../../attributes.service';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements OnInit {

    attributeForm: FormGroup;
    constructor(
        private router: Router,
        private attributesService: AttributesService
    ) { }

    ngOnInit() {
        this.attributeForm = new FormGroup({
            name: new FormControl('', Validators.required),
            value_list: new FormControl('', Validators.required),
            attribute_type: new FormControl(''),
            order: new FormControl('')
        });
    }
    save(){
        const formData = this.attributeForm.getRawValue();
        this.attributesService.post(formData).then(data => {
            this.router.navigate(['/attributes']);
        });

    }


}
