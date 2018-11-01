import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../../devices/devices.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AttributesService} from '../../attributes.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements OnInit {

    attributeForm: FormGroup;
    sub; id; attribute;
    constructor(
        private router: Router,
        private attributesService: AttributesService,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.attributeForm = new FormGroup({
            name: new FormControl('', Validators.required),
            value_list: new FormControl('', Validators.required),
            attribute_type: new FormControl(''),
            order: new FormControl('')
        });
        // Get current dive id from parms and set form
        this.sub = this.route.params.subscribe(params => {
            this.id = + params['id']; // (+) converts string 'id' to a number
            if ( this.id ) {
                this.attributesService.get_by_id(this.id).then(attribute => {
                    this.attribute = attribute;
                    this.setAttributeFrom();
                }, error => {
                    console.log(error);
                });
            }else{
                this.attribute = null;
                this.reset();
            }
        });
    }
    reset(){
        this.attributeForm.reset();
    }
    setAttributeFrom() {
        this.attributeForm.patchValue(this.attribute);

    }
    save(){
        const formData = this.attributeForm.getRawValue();
        if ( this.attribute )
            formData.id = this.attribute.id
        const srvMethod: Promise<any> = !this.attribute ? this.attributesService.post(formData) : this.attributesService.patch(formData);
        srvMethod.then(data => {
            this.router.navigate(['/attributes']);
        }, error => {
            console.log(error);
            this.toastr.error('Attention!', 'Merci de remplir les champs correctement!');
        });

    }


}
