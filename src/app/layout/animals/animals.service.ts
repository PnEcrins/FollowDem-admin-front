import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../settings';

@Injectable()
export class AnimalsService {
	constructor(private http: HttpClient) {}

	get(key = ''): Promise<any> {
		const options = key ? { params: new HttpParams().set('key', key) } : {};
		return this.http.get<any>(config.serverURL + '/api/animals', options).toPromise();
	}

	get_by_id(id: any) {
		return this.http.get<any>(config.serverURL + '/api/animals/' + id, {}).toPromise();
	}

	post(data: any): Promise<any> {
		return this.http.post<any>(config.serverURL + '/api/animals', data).toPromise();
	}

	post_animal_device(data: any): Promise<any> {
		return this.http.post<any>(config.serverURL + '/api/animals/devices', data).toPromise();
	}

	post_animal_attribute(data: any): Promise<any> {
		return this.http.post<any>(config.serverURL + '/api/animals/attributes', data).toPromise();
	}

	delete_animal_device(item: any): Promise<any> {
		let body = new HttpParams();
		body = body.append('id[]', item.id);
		return this.http.delete<any>(config.serverURL + '/api/animals/devices', { params: body }).toPromise();
	}

	delete_animal_attribute(item: any): Promise<any> {
		let body = new HttpParams();
		body = body.append('id[]', item.id);
		return this.http.delete<any>(config.serverURL + '/api/animals/attributes', { params: body }).toPromise();
	}

	patch(data: any): Promise<any> {
		return this.http.patch<any>(config.serverURL + '/api/animals', data).toPromise();
	}
	delete(item: any): Promise<any> {
		let body = new HttpParams();
		body = body.append('id[]', item.id_animal);
		return this.http.delete<any>(config.serverURL + '/api/animals', { params: body }).toPromise();
	}

	device_available(deviceId: number, startDate: any, endDate?: any, animalId?: number, id_cor_ad?: number): Promise<any> {
		let params = new HttpParams();
		if (animalId) params = params.append('animalId', animalId.toString());
		if (animalId) params = params.append('animalId', animalId.toString());
		if (id_cor_ad) params = params.append('id_cor_ad', id_cor_ad.toString());
		if (endDate) params = params.append('endDate', endDate.toString());
		params = params.append('deviceId', deviceId.toString());
		params = params.append('startDate', startDate.toString());
		return this.http.get<any>(config.serverURL + '/api/animals/devices/date_available', { params: params }).toPromise();
	}
}
