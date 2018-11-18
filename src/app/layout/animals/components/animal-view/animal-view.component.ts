import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalsService} from '../../animals.service';
import {DeviceService} from '../../../devices/devices.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.scss']
})
export class AnimalViewComponent implements OnInit {
  sub;
  id;
  animal;
  devices;
  add_device = false;
  add_attribute  = false;
  device_cols = ['id', 'device', 'start_at', 'end_at', 'comment'];
  attribute_cols = ['id', 'attribute', 'value'];
  modelRef;
  current_animal_device;
  current_animal_attribute;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private animalsService: AnimalsService,
              private deviceService: DeviceService,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.id = + params['id']; // (+) converts string 'id' to a number
          if ( this.id ) {
              this.animalsService.get_by_id(this.id).then(animal => {
                  this.animal = animal;
                  console.log(animal);
              }, error => {
                  console.log(error);
              });
          }
      });
      this.deviceService.get().then(data => {
          this.devices = data;
      });
  }
  get_output(animal: any) {
      if(animal.error === 'cancelAttr') {
          this.add_attribute = false;
          return;
      }else if(animal.error === 'cancelDevice'){
          this.add_device = false;
          return;
      }else if( animal.error) {
          return;
      }
    this.animal = animal;
    this.add_device = false;
    this.add_attribute = false;
  }
    open(content, animal_attribute , animal_device ) {
        this.modelRef = this.modalService.open(content);
        this.current_animal_device = animal_device;
        this.current_animal_attribute = animal_attribute;
    }
    edit(animal_attribute, animal_device) {
      if (animal_device) {
          this.add_device = true;
          this.current_animal_device = animal_device;
      }
      else if (animal_attribute){
        this.add_attribute = true;
        this.current_animal_attribute = animal_attribute;
      }
    }
    confirm(key) {
      if( this.current_animal_device )
        this.animalsService.delete_animal_device(this.current_animal_device).then(data => {
            console.log(data);
            this.animal.animal_devices = this.animal.animal_devices.filter(item => item.id !== this.current_animal_device.id);
            this.modelRef.close();
        });
      else
          this.animalsService.delete_animal_attribute(this.current_animal_attribute).then(data => {
              console.log(data);
              this.animal.animal_attributes = this.animal.animal_attributes.filter(item => item.id !== this.current_animal_attribute.id);
              this.modelRef.close();
          });
    }
}
