import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { City } from '../_models/city.model';
import { variable } from '@angular/compiler/src/output/output_ast';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

const API_URL = 'http://localhost:3000/cities';
const API_ARGS: RequestOptions = new RequestOptions();
const headers = new Headers();
headers.append('Content-Type', 'application/json');
API_ARGS.headers = headers;

@Injectable()
export class CityService {

  constructor(private http: Http) { }

  getCities(): Observable<City[]> {
    return this.http.get(API_URL)
                    .map(result => result.json())
                    .catch(err => {
                      console.log('Error in fetching json', err);
                      return Observable.of([]);
                    });
  }

  addCity(city: string, icon: string, status: string) {
    const newCity = new City(null, city, icon, status);
    return this.http.post(API_URL, JSON.stringify(newCity), API_ARGS)
                    .map(result => console.log(result));
  }

  deleteCity(city: City) {
    return this.http.delete(API_URL + `/${city.id}`)
                    .map(result => result.json())
                    .catch(err => {
                      return Observable.of([]);
                    });
  }
}
