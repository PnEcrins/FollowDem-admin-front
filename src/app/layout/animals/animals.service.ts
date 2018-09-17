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
    post(data: any): Promise<any> {
        return this.http.post<any>(config.serverURL + '/api/animals', data)
            .toPromise();
    }
    delete(item: any): Promise<any> {
        let body = new HttpParams();
         body = body.append('id[]', item.id);
        return this.http.delete<any>(config.serverURL + '/api/animals', {params: body})
            .toPromise();
    }
}
