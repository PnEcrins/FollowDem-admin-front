import { NgModule } from '@angular/core';
import { FormErrorComponent } from './components/form-errors.component';
import { FormFeedBackDirective } from './directives/form-feed-back.directive';
import { CommonModule } from '@angular/common';
@NgModule({
	imports: [ CommonModule ],
	declarations: [ FormErrorComponent, FormFeedBackDirective ],
	exports: [ FormErrorComponent, FormFeedBackDirective ]
})
export class SharedModule {}
