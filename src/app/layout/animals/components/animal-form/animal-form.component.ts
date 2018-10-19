import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalsService} from '../../animals.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {
    animalForm: FormGroup;
    //animal edit
    id: number;
    private sub: any;
    animal;
  constructor(private animalsService: AnimalsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.animalForm = new FormGroup({
          name: new FormControl('', Validators.required),
          birth_year: new FormControl('', Validators.required),
          capture_date: new FormControl('', Validators.required),
          death_date: new FormControl(),
          comment: new FormControl()
      });
      // Get current dive id from parms and set form
      this.sub = this.route.params.subscribe(params => {
          this.id = + params['id']; // (+) converts string 'id' to a number
          if ( this.id ) {
              this.animalsService.get_by_id(this.id).then(animal => {
                  this.animal = animal;
                  this.setAnimalFrom();
              }, error => {
                  console.log(error);
              });
          }else{
              this.animal = null;
              this.reset();
          }
      });
  }
    reset(){
      this.animalForm.reset();
    }
    setAnimalFrom() {
        this.animalForm.patchValue(this.animal);
        this.animalForm.get('capture_date').setValue({
            year: new Date(this.animal.capture_date).getFullYear(),
            month: new Date(this.animal.capture_date).getMonth() + 1,
            day: new Date(this.animal.capture_date).getDate(),
        });
        this.animalForm.get('death_date').setValue({
            year: new Date(this.animal.death_date).getFullYear(),
            month: new Date(this.animal.death_date).getMonth() + 1,
            day: new Date(this.animal.death_date).getDate(),
        });


    }
  toDate(date): String {
        if( (typeof date === "object") && (date !== null) )
            return new Date('' + date.year + '-' + date.month + '-' + date.day).toISOString();
        return date;
  }
  save(){
      const formData = this.animalForm.getRawValue();
      formData.birth_year = this.toDate(this.animalForm.controls['birth_year'].value);
      formData.capture_date = this.toDate(this.animalForm.controls['capture_date'].value);;
      formData.death_date = this.toDate(this.animalForm.controls['death_date'].value);
      if ( this.animal )
          formData.id = this.animal.id
      const srvMethod: Promise<any> = !this.animal ? this.animalsService.post(formData) : this.animalsService.patch(formData);
      srvMethod.then(data => {
          this.router.navigate(['/animals']);
      });
  }

}
