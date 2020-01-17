import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsComponent } from './animals.component';
import {TranslateModule} from '@ngx-translate/core';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AnimalViewComponent } from './components/animal-view/animal-view.component';
import { AnimalDeviceFormComponent } from './components/animal-device-form/animal-device-form.component';
import { AnimalAttributeFormComponent } from './components/animal-attribute-form/animal-attribute-form.component';


@NgModule({
    imports: [
        CommonModule,
        AnimalsRoutingModule,
        TranslateModule,
        NgbModule,
        ReactiveFormsModule,
        ],
    declarations: [
        AnimalsComponent,
        AnimalFormComponent,
        AnimalViewComponent,
        AnimalDeviceFormComponent,
        AnimalAttributeFormComponent]
})
export class AnimalsModule {}
