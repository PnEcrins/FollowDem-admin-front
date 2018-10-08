import { Component, OnInit } from '@angular/core';
import {DeviceService} from './devices.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
    animals = [];
    cols = [];
    devices;
  constructor(private deviceService: DeviceService,
              private translate: TranslateService) { }

  ngOnInit() {
      this.setDevices();
  }
    setDevices(){
        this.deviceService.get().then(data => {
            const keys = Object.keys(data[0]);
            this.cols = keys;
            const columns = [];
            const rows = [];
            this.devices = data;
            for ( const key of keys ) {
                columns.push({headerName: this.translate.instant(key), field: key });
            }
            for ( const item of data ) {
                const obj = {}
                for ( const key of keys ) {
                    obj[key] = item[key];
                }
                rows.push(obj);
            }
        });
    }
}
