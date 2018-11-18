import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { config } from '../../settings';

@Injectable()
export class DeviceService {
    constructor(
        private http: HttpClient
    ) {
    }
    get_device_types(): Promise<any> {
        return this.http.get<any>(config.serverURL + '/api/device_types')
            .toPromise();
    }
    get_by_id(id: any) {
        return this.http.get<any>(config.serverURL + '/api/devices/' + id, {})
            .toPromise();
    }
    get(key = ''): Promise<any> {
        const options = key ? { params: new HttpParams().set('key', key)} : {};
        return this.http.get<any>(config.serverURL + '/api/devices', options)
            .toPromise();
    }
    post(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/devices', data)
            .toPromise();
    }
    patch(data: any): Promise<any> {
        return this.http.patch<any>(config.serverURL + '/api/devices', data)
            .toPromise();
    }
    delete(item: any): Promise<any> {
        let body = new HttpParams();
        body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/devices', {params: body})
            .toPromise();
    }
}
