import { Directive, Self, SkipSelf, Host } from '@angular/core';
import { NgControl, FormGroupDirective } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[FeedBack]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.is-invalid]': 'isInvalid'
  }
})
export class FormFeedBackDirective {

  constructor(
    @Host() @SkipSelf() private form: FormGroupDirective,
    @Self() private control: NgControl
  ) {
  }

  get isInvalid() {
    return this.control.invalid && (this.form.submitted);
  }

}