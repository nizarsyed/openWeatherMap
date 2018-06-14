import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CityService } from '../_shared/city.service';
import { City } from '../_models/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: Observable<City[]>;

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cities = this.cityService.getCities();
  }

  addCity(city: string, icon: string, status: string) {
    this.cityService.addCity(city, icon, status)
        .subscribe(result => {
          this.cities = this.cityService.getCities();
        });
  }

  deleteCity(city: City) {
    this.cityService.deleteCity(city)
        .subscribe(result => {
          this.cities = this.cityService.getCities();
        });
  }
}





