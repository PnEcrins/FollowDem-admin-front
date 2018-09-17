import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsComponent } from './animals.component';
import { PageHeaderModule } from '../../shared';
import {AgGridModule} from 'ag-grid-angular';
import {TranslateModule} from '@ngx-translate/core';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        AnimalsRoutingModule,
        TranslateModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        AgGridModule.withComponents([])],
    declarations: [AnimalsComponent, AnimalFormComponent]
})
export class AnimalsModule {}
