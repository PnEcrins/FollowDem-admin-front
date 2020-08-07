import { Component, Input, Host, SkipSelf } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-form-error',
	templateUrl: './form-errors.component.html'
})
export class FormErrorComponent {
	@Input() controlName: string;
	@Input() errorKey: string;
	requiredFiled: string;
	type_already_exists: any;
	animal_already_exists: any;
	attirbute_already_exists: any;
	device_already_exists: any;
	order_already_exists: any;
	invalid_year: any;
	birth_year_error: any;

	constructor(
		@Host()
		@SkipSelf()
		private form: FormGroupDirective,
		private translateService: TranslateService
	) {}

	get isInvalid() {
		const control = this.form.form.get(this.controlName);
		return control.hasError(this.errorKey) && (control.dirty || this.form.submitted);
	}

	get error_msg() {
		this.translateService.get('required-field').subscribe((res) => (this.requiredFiled = res));
		this.translateService.get('type_already_exists').subscribe((res) => (this.type_already_exists = res));
		this.translateService.get('animal_already_exists').subscribe((res) => (this.animal_already_exists = res));
		this.translateService.get('attirbute_already_exists').subscribe((res) => (this.attirbute_already_exists = res));
		this.translateService.get('device_already_exists').subscribe((res) => (this.device_already_exists = res));
		this.translateService.get('order_already_exists').subscribe((res) => (this.order_already_exists = res));
		this.translateService.get('invalid_year').subscribe((res) => (this.invalid_year = res));
		this.translateService.get('birth_year_error').subscribe((res) => (this.birth_year_error = res));
		if (this.controlName === 'login') {
			if (this.errorKey === 'login') {
				return 'Identifant incorrect';
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'password') {
			if (this.errorKey === 'password') {
				return 'Mot de passe incorrect';
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'device_type') {
			if (this.errorKey === 'type_already_exists') {
				return this.type_already_exists;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'name') {
			if (this.errorKey === 'animal_already_exists') {
				return this.animal_already_exists;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'attribute') {
			if (this.errorKey === 'attirbute_already_exists') {
				return this.attirbute_already_exists;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'ref_device') {
			if (this.errorKey === 'device_already_exists') {
				return this.device_already_exists;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}

		if (this.controlName === 'order') {
			if (this.errorKey === 'order_already_exists') {
				return this.order_already_exists;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			}
		}
		if (this.controlName === 'birth_year') {
			if (this.errorKey === 'pattern') {
				return this.invalid_year;
			} else if (this.errorKey === 'required') {
				return this.requiredFiled;
			} else if (this.errorKey === 'birth_year_error') {
				return this.birth_year_error;
			}
		}

		return this.requiredFiled;
	}
}
