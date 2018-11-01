import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {TypeDeviceService} from './type-devices.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-type-device',
  templateUrl: './type-device.component.html',
  styleUrls: ['./type-device.component.scss'],
  animations: [routerTransition()]
})
export class TypeDeviceComponent implements OnInit {

    cols = [];
    type_devices;
    currentItem;
    modelRef;
    constructor(private typeDeviceService: TypeDeviceService,
                private translate: TranslateService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.setTypeDevices();
    }
    setTypeDevices() {
        this.typeDeviceService.get().then(data => {
            const keys = ['id', 'name']
            this.cols = keys;
            this.type_devices = data;
        });
    }
    open(content, item) {
        this.modelRef = this.modalService.open(content);
        this.currentItem = item;
    }
    confirm(key) {
        this.typeDeviceService.delete(this.currentItem).then(data => {
            console.log(data);
            this.setTypeDevices();
            this.modelRef.close();
        });
    }
}
