import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

const I18N_VALUES = {
	fr: {
		weekdays: [ 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di' ],
		months: [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc' ]
	},
	en: {
		weekdays: [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su' ],
		months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
	}
	// other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable({
	providedIn: 'root'
})
export class I18n {
	language: string;
	constructor(private translate: TranslateService) {}

	getCurrentLanguage() {
		this.language = this.translate.currentLang;
		return this.language;
	}
}

// Define custom service providing the months and weekdays translations
@Injectable({
	providedIn: 'root'
})
export class CustomDatepickerI18nService extends NgbDatepickerI18n {
	constructor(private _i18n: I18n) {
		super();
	}

	getWeekdayShortName(weekday: number): string {
		let lang = this._i18n.getCurrentLanguage();
		return I18N_VALUES[lang].weekdays[weekday - 1];
	}
	getMonthShortName(month: number): string {
		let lang = this._i18n.getCurrentLanguage();
		return I18N_VALUES[lang].months[month - 1];
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}

	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}
