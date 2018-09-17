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
  columnDefs = [];
  rowData = [];
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
  setAnimals(){
      this.animalService.get().then(data => {
          let keys = Object.keys(data[0]);
          this.cols = keys;
          let columns= [];
          let rows= [];
          this.animals = data;
          for(let key of keys){
              columns.push({headerName: this.translate.instant(key), field: key });
          }
          for(let item of data){
              let obj = {}
              for(let key of keys){
                  obj[key] = item[key]
              }
              rows.push(obj)
          }
          console.log(columns);
          console.log(rows);

          this.columnDefs = columns;
          this.rowData = rows;
      });
  }

}
