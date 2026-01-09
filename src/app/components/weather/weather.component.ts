import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../models/weather.model';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

    savedWeather$!: Observable<WeatherData[]>;
    searchResult: WeatherData[] | null = null;
    searchQuery: string = '';
    errorMessage: string = '';

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.refreshWeatherTable();
    }

    refreshWeatherTable() {
        this.savedWeather$ = this.weatherService.getWeather();
    }

    searchWeather() {
        if (!this.searchQuery) return;
        this.errorMessage = '';

        // API expects "q=CityName"
        const query = `q=${this.searchQuery}`;

        this.weatherService.getOpenWeatherMap(query).subscribe({
            next: (data) => {
                this.searchResult = data;
            },
            error: (err) => {
                this.errorMessage = 'City not found or API error.';
                this.searchResult = null;
            }
        });
    }

    saveWeather(data: WeatherData) {
        // In legacy, it saved the data to local DB.
        // The legacy addOpenWeatherMap took flattened args, but service reconstructed it.
        // Here we pass the object.
        // Warning: The ID from OpenWeatherMap might conflict if we use it as DB ID.
        // json-server uses 'id'. OpenWeatherMap has 'id'.
        // If we overwrite 'id', we might lose the API ID.
        // However, legacy code passed `id` (API City ID) as `id`.
        // json-server usually generates `id` if not provided, or accepts it.
        // Let's rely on the object structure.

        this.weatherService.addWeatherData(data).subscribe(() => {
            this.refreshWeatherTable();
            this.searchResult = null; // Clear search after adding? Or keep it.
            this.searchQuery = '';
        });
    }

    deleteWeather(id: number) {
        this.weatherService.deleteWeather(id).subscribe(() => {
            this.refreshWeatherTable();
        });
    }
}
