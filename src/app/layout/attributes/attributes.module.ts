import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesComponent } from './attributes.component';
import {AttributesRoutingModule} from './attributes-rooting.module';
import {AttributeFormComponent} from './components/attribute-form/attribute-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AttributesRoutingModule,
      TranslateModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
  ],
  declarations: [
      AttributesComponent,
      AttributeFormComponent
  ]
})
export class AttributesModule { }
