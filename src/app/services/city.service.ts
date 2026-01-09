import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from '../models/city.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private apiUrl = `${environment.apiUrl}/cities`;

    constructor(private http: HttpClient) { }

    getCities(): Observable<City[]> {
        return this.http.get<City[]>(this.apiUrl)
            .pipe(
                catchError(error => {
                    console.error('Error fetching cities', error);
                    return throwError(() => error);
                })
            );
    }

    addCity(cityData: City): Observable<City> {
        return this.http.post<City>(this.apiUrl, cityData);
    }

    deleteCity(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
