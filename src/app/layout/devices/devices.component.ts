import { Component, OnInit } from '@angular/core';
import {DeviceService} from './devices.service';
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
              private modalService: NgbModal
              ) { }

  ngOnInit() {
      this.setDevices();
  }
    setDevices(key = '') {
        this.deviceService.get(key).then(data => {
            const keys = ['reference', 'type', 'comment']
            this.cols = keys;
            this.devices = data;
        });
    }
    open(content, item) {
        this.modelRef = this.modalService.open(content,{ windowClass: 'confirm-delete-modal', centered: true });
        this.currentItem = item;
    }
    confirm(key){
        this.deviceService.delete(this.currentItem).then(data => {
            this.setDevices();
            this.modelRef.close();
        });
    }
}
