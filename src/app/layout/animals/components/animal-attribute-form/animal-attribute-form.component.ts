import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttributesService } from '../../../attributes/attributes.service';
import _ from 'lodash';

@Component({
	selector: 'app-animal-attribute-form',
	templateUrl: './animal-attribute-form.component.html',
	styleUrls: [ './animal-attribute-form.component.scss' ]
})
export class AnimalAttributeFormComponent implements OnInit {
	animal_attributes = [];
	showAttributeForm = false;
	attribute_cols = [ 'id', 'attribute', 'value' ];
	addAttributeError: boolean = false;
	closedAlertAttribute = false;
	attributes = [];
	attribute_values = [];
	attributeForm: FormGroup;
	@Input() editMode: boolean;

	constructor(private attributeService: AttributesService, private fb: FormBuilder) {}

	ngOnInit() {
		this.attributeForm = this.fb.group({
			attributeSelect: [ null, Validators.required ],
			value: [ { value: '', disabled: true }, Validators.required ]
		});

		this.attributeForm.controls['attributeSelect'].valueChanges.subscribe((val) => {
			if (val) {
				this.attributes.forEach((attribute) => {
					if (attribute.id == val.id) this.attribute_values = attribute.value_list.split(';');
				});
				this.attributeForm.controls['value'].enable();
			}
		});

		this.attributeService.get().then((attributes) => {
			this.attributes = attributes;
		});
    }
    
	onAddAttribute() {
		this.showAttributeForm = true;
	}

	onCancelAttribute() {
		this.attributeForm.reset();
		this.showAttributeForm = false;
		this.closedAlertAttribute = true;
		this.attributeForm.controls['value'].disable();
	}

	onSaveAttribute(attributeTodAdd) {
		if (this.attributeForm.valid) {
			attributeTodAdd.id = attributeTodAdd.attributeSelect.id;
			attributeTodAdd.attribute = attributeTodAdd.attributeSelect.name;
			let attrib_exist = this.animal_attributes.find((item) => {
				return item.id == attributeTodAdd.id;
			});
			if (attrib_exist) {
				this.addAttributeError = true;
				this.closedAlertAttribute = false;
			} else {
				this.animal_attributes.push(attributeTodAdd);
				this.attributeForm.reset();
				this.showAttributeForm = false;
				this.closedAlertAttribute = true;
				this.attributeForm.controls['value'].disable();
			}
		}
	}

	onDeleteAttribute(attributeToDelete: any) {
		this.animal_attributes = _.remove(this.animal_attributes, (attribute: any) => {
			return attributeToDelete.id != attribute.id;
		});
	}

	onEditAttribute() {}
}
