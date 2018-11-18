import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalsService} from '../../animals.service';
import {AttributesService} from '../../../attributes/attributes.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-animal-attribute-form',
  templateUrl: './animal-attribute-form.component.html',
  styleUrls: ['./animal-attribute-form.component.scss']
})
export class AnimalAttributeFormComponent implements OnInit {
    @Input() animal;
    @Input() animal_attribute;
    @Output() changed = new EventEmitter<any>();
    attributes;
    animalAttributeForm: FormGroup;
  constructor(private attributeService: AttributesService,
              private animalsService: AnimalsService,
              private toastr: ToastrService) { }

  ngOnInit() {
      this.attributeService.get().then(data => {
          this.attributes = data;
      });
      this.animalAttributeForm = new FormGroup({
          attribute_id: new FormControl('', Validators.required),
          value: new FormControl('', Validators.required)
      });
      console.log(this.animal_attribute);
      if(this.animal_attribute){
          this.animalAttributeForm.patchValue(this.animal_attribute);
          this.animalAttributeForm.controls['attribute_id'].setValue(this.animal_attribute.attribute.id);
      }
  }
  save() {
    const formData =  this.animalAttributeForm.getRawValue();
      if(this.animal_attribute)
          formData.id = this.animal_attribute.id;
      formData.animal_id = this.animal.id;
      this.animalsService.post_animal_attribute(formData).then(data => {
          this.changed.emit(data);
      }, error => {
          console.log(error);
          this.toastr.error('Attention!', 'Merci de remplir les champs correctement!');
      });
  }
  cancel() {
      this.changed.emit({animal: this.animal, error: 'cancelAttr' });
  }

}
