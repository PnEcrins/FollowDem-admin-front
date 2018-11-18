import { Component, OnInit } from '@angular/core';
import {DeviceService} from './devices.service';
import {TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../../router.animations';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
    animations: [routerTransition()]
})
export class DevicesComponent implements OnInit {
  animals = [];
  cols = [];
  devices;
  currentItem;
  modelRef;
  constructor(private deviceService: DeviceService,
              private translate: TranslateService,
              private modalService: NgbModal) { }

  ngOnInit() {
      this.setDevices();
  }
    setDevices(key = '') {
        this.deviceService.get(key).then(data => {
           const keys = ['id', 'reference', 'comment']
            this.cols = keys;
            this.devices = data;
        });
    }
    open(content, item) {
        this.modelRef = this.modalService.open(content);
        this.currentItem = item;
    }
    confirm(key){
        this.deviceService.delete(this.currentItem).then(data => {
            console.log(data);
            this.setDevices();
            this.modelRef.close();
        });
    }
}
