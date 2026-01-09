import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { WeatherData, Weather, Sys, Main, Wind, Clouds, Coord } from '../_models/weatherData.model';
import { variable } from '@angular/compiler/src/output/output_ast';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

const API_URL_WEATHER = 'http://localhost:3000/weather';
const API_ARGS: RequestOptions = new RequestOptions();
const headers = new Headers();
headers.append('Content-Type', 'application/json');
API_ARGS.headers = headers;
const OPENWEATHER_URL = 'http://openweathermap.org/data/2.5/weather?q=cityname&appid=key';
const API_KEY = 'b6907d289e10d714a6e88b30761fae22';


@Injectable()
export class WeatherService {
  idArray: string[];

  constructor(private http: Http) { }

  getWeather(): Observable<WeatherData[]> {
    return this.http.get(API_URL_WEATHER)
                    .map(result => result.json())
                    .catch(err => {
                      console.log('Error in fetching json', err);
                      return Observable.of([]);
                    });
  }

  getOpenWeatherMap(url: string): Observable<WeatherData[]> {
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {

    const body = Array.of(res.json());
    console.log(body);
    return body;
  }

  private handleError(error: Response | any) {
    // console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  addOpenWeatherMap(lon: string, lat: string, weatherID: string, main: string, description: string, icon: string, base: string,
                    temp: string, pressure: string, sea_level: string, humidity: string, temp_min: string, temp_max: string,
                    visibility: string, speed: string, deg: string, all: string, dt: string, type: string, sysId: string,
                    message: string, country: string, sunrise: string, sunset: string, id: string, name: string, cod: string
                    ) {
    const newCoord = new Coord(lon, lat);
    const newWeather = [new Weather(weatherID, main, description, icon)];
    const newMain = new Main(temp, pressure, sea_level, humidity, temp_min, temp_max);
    const newWind = new Wind(speed, deg);
    const newCloud = new Clouds(all);
    const newSYS = new Sys(type, sysId, message, country, sunrise, sunset);

    const inputData = new WeatherData(newCoord, newWeather, base , newMain, visibility, newWind, newCloud, dt, newSYS, id, name, cod);

    return this.http.post(API_URL_WEATHER, JSON.stringify(inputData), API_ARGS)
                    .map(result => console.log(result));
  }

  deleteWeather(idToBeDeleted: string) {
    return this.http.delete(API_URL_WEATHER + `/${idToBeDeleted}`)
                    .map(result => result.json())
                    .catch(err => {
                      return Observable.of([]);
                    });
  }

  deleteAllWeather() {
    // for (let index = 0; index < 2000000; index++) {
    //   return this.http.delete(API_URL_WEATHER + `/${index}`)
    //                   .map(result => result.json())
    //                   .catch(err => {return Observable.of([]);
    //                                 });
    // }

    return this.http.get(API_URL_WEATHER).map(res => res.json()).forEach(res => this.idArray);

  }




}
