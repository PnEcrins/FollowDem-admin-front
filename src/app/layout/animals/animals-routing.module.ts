import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalsComponent } from './animals.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { AnimalViewComponent } from './components/animal-view/animal-view.component';

const routes: Routes = [
    {
        path: '',
        component: AnimalsComponent
    },
    {
        path: 'animal-view/:id',
        component: AnimalViewComponent
    },
    {
        path: 'animal-form/:id',
        component: AnimalFormComponent
    },
    {
      path: 'animal-form',
      component: AnimalFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnimalsRoutingModule {}
