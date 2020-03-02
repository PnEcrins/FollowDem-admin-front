import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttributesService } from '../../../attributes/attributes.service';
import _ from 'lodash';
import { $ } from 'protractor';

@Component({
	selector: 'app-animal-attribute-form',
	templateUrl: './animal-attribute-form.component.html',
	styleUrls: [ './animal-attribute-form.component.scss' ]
})
export class AnimalAttributeFormComponent implements OnInit {
	showAttributeForm = false;
	attribute_cols = [ 'id', 'attribute_name', 'value' ];
	addAttributeError: boolean = false;
	closedAlertAttribute = false;
	editAttribute: boolean = false; // is true on edit attribute mode
	attributes = [];
	attribute_values = [];
	attributeForm: FormGroup;
	@Input() animal_attributes: any[];
	@Input() viewMode: boolean; // input to check if view animal
	@Output() added_attributes = new EventEmitter<any>();
	attributeToEdit: any;

	constructor(private attributeService: AttributesService, private fb: FormBuilder) {
		this.attributeForm = this.fb.group({
			attributeSelect: [ null, Validators.required ],
			value: [ { value: null, disabled: true }, Validators.required ]
		});
	}

	ngOnInit() {
		if (!this.animal_attributes) this.animal_attributes = [];		
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
		this.attributeToEdit = null;
		this.editAttribute = false;
		this.attributeForm.controls['value'].disable();
		this.attributeForm.controls['attributeSelect'].enable();
	}

	onSaveAttribute(attributeOnSave) {
		if (this.attributeForm.valid) {
			// on Edit attribute
			if (this.editAttribute) {
				// find and update attribue
				let indexAttribute = this.animal_attributes.findIndex((attribue) => {
					return attribue.device_id == this.attributeToEdit.device_id;
				});
				this.attributeToEdit.value = attributeOnSave.value;
				this.animal_attributes[indexAttribute] = this.attributeToEdit;
				// reset attributre form and init value
				this.editAttribute = false;
				this.attributeForm.controls['attributeSelect'].enable();
				this.attributeForm.reset();
				this.showAttributeForm = false;
				this.attributeToEdit = null;
				this.added_attributes.emit(this.animal_attributes);
			} else {
				// on add new attribute
				attributeOnSave.id = attributeOnSave.attributeSelect.id;
				attributeOnSave.attribute_name = attributeOnSave.attributeSelect.name;
				let attrib_exist = this.animal_attributes.find((item) => {
					return item.id == attributeOnSave.id;
				});
				// check if attribute is already added
				if (attrib_exist) {
					this.addAttributeError = true;
					this.closedAlertAttribute = false;
				} else {
					this.animal_attributes.push(attributeOnSave);
					// reset attributre form and init value
					this.attributeForm.reset();
					this.showAttributeForm = false;
					this.closedAlertAttribute = true;
					this.attributeForm.controls['value'].disable();
					this.added_attributes.emit(this.animal_attributes);
				}
			}
		}
	}

	onDeleteAttribute(attributeToDelete: any) {
		this.animal_attributes = _.remove(this.animal_attributes, (attribute: any) => {
			return attributeToDelete.id != attribute.id;
		});
		this.added_attributes.emit(this.animal_attributes);
	}

	onEditAttribute(attributeToEdit) {
		this.editAttribute = true;
		this.attributeToEdit = attributeToEdit;
		let att_index = this.attributes.findIndex((item) => {
			if (attributeToEdit.attribute) return item.id == attributeToEdit.attribute.id;
			if (attributeToEdit.attributeSelect) return item.id == attributeToEdit.attributeSelect.id;
		});
		this.attributeForm.patchValue({
			attributeSelect: this.attributes[att_index],
			value: attributeToEdit.value
		});
		this.attributeForm.controls['attributeSelect'].disable();
		this.showAttributeForm = true;
	}
}
