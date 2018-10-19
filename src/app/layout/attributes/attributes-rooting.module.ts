import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes.component';
import {AttributeFormComponent} from './components/attribute-form/attribute-form.component';

const routes: Routes = [
    {
        path: '',
        component: AttributesComponent
    },
    {
        path: 'attribute-form',
        component: AttributeFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttributesRoutingModule {}
