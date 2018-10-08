import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalsService} from '../../animals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {
  animalForm: FormGroup;
  constructor(private animalsService: AnimalsService,
              private router:Router) { }

  ngOnInit() {
      this.animalForm = new FormGroup({
          name: new FormControl('', Validators.required),
          birth_year: new FormControl('', Validators.required),
          capture_date: new FormControl('', Validators.required),
          death_date: new FormControl(),
          comment: new FormControl()
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
      formData.death_date = this.toDate(this.animalForm.controls['death_date'].value);;
      this.animalsService.post(formData).then(data => {
          this.router.navigate(['/animals']);
      });
  }

}
