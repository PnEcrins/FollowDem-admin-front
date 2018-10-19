import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { config } from '../../settings';

@Injectable()
export class AnimalsService {
    constructor(
        private http: HttpClient
    ) {
    }
    get(): Promise<any> {
        return this.http.get<any>(config.serverURL + '/api/animals')
            .toPromise();
    }
    get_by_id(id: any) {
        return this.http.get<any>(config.serverURL + '/api/animals/' + id, {})
            .toPromise();
    }
    post(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/animals', data)
            .toPromise();
    }
    post_animal_device(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/animals/devices', data)
            .toPromise();
    }
    post_animal_attribute(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/animals/attributes', data)
            .toPromise();
    }
    delete_animal_device(item: any): Promise<any> {
        let body = new HttpParams();
        body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/animals/devices', {params: body})
            .toPromise();
    }
    delete_animal_attribute(item: any): Promise<any> {
        let body = new HttpParams();
        body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/animals/attributes', {params: body})
            .toPromise();
    }
    patch(data: any): Promise<any> {
        return this.http.patch<any>(config.serverURL + '/api/animals', data)
            .toPromise();
    }
    delete(item: any): Promise<any> {
        let body = new HttpParams();
         body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/animals', {params: body})
            .toPromise();
    }
}
