import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {AnimalsService} from './animals.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  animations: [routerTransition()]

})
export class AnimalsComponent implements OnInit {
  animals = [];
  cols = [];
  currentItem;
  modelRef;
  constructor(private animalService: AnimalsService,
               private translate: TranslateService,
              private modalService: NgbModal) {
  }

  open(content, item) {
      this.modelRef = this.modalService.open(content);
      this.currentItem = item;
  }
    confirm(key){
      this.animalService.delete(this.currentItem).then(data => {
          console.log(data);
          this.setAnimals();
          this.modelRef.close();
      })
  }
  ngOnInit() {
      this.setAnimals();
  }
  setAnimals() {
      this.animalService.get().then(data => {
          const keys = ['id', 'name', 'birth_year', 'capture_date', 'death_date']
          this.cols = keys;
          this.animals = data;
      });
  }

}
