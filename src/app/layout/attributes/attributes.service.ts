import { Injectable } from '@angular/core';
import {config} from '../../settings';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private http: HttpClient) { }
    post(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/attributes', data)
            .toPromise();
    }
    patch(data: any): Promise<any> {
        return this.http.patch<any>(config.serverURL + '/api/attributes', data)
            .toPromise();
    }
    get(): Promise<any> {
        return this.http.get<any>(config.serverURL + '/api/attributes')
            .toPromise();
    }
    delete(item: any): Promise<any> {
        let body = new HttpParams();
        body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/attributes', {params: body})
            .toPromise();
    }
    get_by_id(id: any) {
        return this.http.get<any>(config.serverURL + '/api/attributes/' + id, {})
            .toPromise();
    }
}
