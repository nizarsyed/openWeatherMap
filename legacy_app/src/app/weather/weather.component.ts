import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../_models/weatherData.model';
import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../_shared/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  startURL = 'http://openweathermap.org/data/2.5/weather?q=';
  endURL =  '&appid=b6907d289e10d714a6e88b30761fae22';
  newURL: string;
  weatherData: Observable<WeatherData[]>;
  weatherDatas: Observable<WeatherData[]>;
  weatherDataList: WeatherData[];
  idArray: WeatherData[] = [];
  localJsonWeatherData: Observable<WeatherData[]>;
  errorMessage: String;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherDatas = this.weatherService.getWeather();
  }

  refreshWeatherTable() {
    this.weatherDatas = this.weatherService.getWeather();
  }

  getOpenWeatherMap(url: string) {
    this.newURL = this.startURL + url + this.endURL;
    console.log(this.newURL);
    this.weatherData = this.weatherService.getOpenWeatherMap(this.newURL);
    this.weatherData.subscribe(
    weatherDataList => this.weatherDataList = weatherDataList,
    error => this.errorMessage = <any>error
    );
  }

  addOpenWeatherMap(lon: string, lat: string, weatherID: string, main: string, description: string, icon: string, base: string,
                    temp: string, pressure: string, sea_level: string, humidity: string, temp_min: string, temp_max: string,
                    visibility: string, speed: string, deg: string, all: string, dt: string, type: string, sysId: string,
                    message: string, country: string, sunrise: string, sunset: string, id: string, name: string, cod: string) {
    this.weatherService.addOpenWeatherMap(lon, lat, weatherID, main, description, icon, base, temp, pressure,
                                          sea_level, humidity, temp_min, temp_max, visibility, speed, deg,
                                          all, dt, type, sysId, message, country, sunrise, sunset, id, name, cod)
                       .subscribe(result => {this.weatherDatas = this.weatherService.getWeather();
    });
  }

  deleteWeather(weatherData: WeatherData) {
    const idToBeDeleted = weatherData.id;
    this.weatherService.deleteWeather(idToBeDeleted)
                    .subscribe(result => {
    this.weatherDatas = this.weatherService.getWeather();
    });
  }

  deleteAllWeather() {
    console.log(this.weatherService.deleteAllWeather());

    // const ar = [this.weatherService.getWeather().subscribe(res => this.idArray = res)];
    // console.log(ar);

  }


}














