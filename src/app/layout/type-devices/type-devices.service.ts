import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { config } from '../../settings';

@Injectable()
export class TypeDeviceService {
    constructor(
        private http: HttpClient
    ) {
    }
    get_by_id(id: any) {
        return this.http.get<any>(config.serverURL + '/api/device_types/' + id, {})
            .toPromise();
    }
    get(): Promise<any> {
        return this.http.get<any>(config.serverURL + '/api/device_types')
            .toPromise();
    }
    post(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/device_types', data)
            .toPromise();
    }
    patch(data: any): Promise<any> {
        return this.http.patch<any>(config.serverURL + '/api/device_types', data)
            .toPromise();
    }
    delete(item: any): Promise<any> {  
        let body = new HttpParams();
        body = body.append('id[]', item.id_device_type);
        return this.http.delete<any>(config.serverURL + '/api/device_types', {params: body})
            .toPromise();
    }
}
