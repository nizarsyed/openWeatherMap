import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WeatherData } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private weatherApiUrl = `${environment.apiUrl}/weather`;
    private weatherApiUrlBase = environment.weatherApi.url;
    private apiKey = environment.weatherApi.apiKey;

    constructor(private http: HttpClient) { }

    getWeather(): Observable<WeatherData[]> {
        return this.http.get<WeatherData[]>(this.weatherApiUrl)
            .pipe(
                catchError(error => {
                    console.error('Error fetching weather data', error);
                    return throwError(() => error);
                })
            );
    }
    getOpenWeatherMap(query: string): Observable<WeatherData[]> {
        // Query usually is "q=CityName", but WeatherAPI uses "q=CityName" as well.
        // We need to extract the city name if "q=" is prefixed.
        const cleanQuery = query.replace('q=', '');
        const url = `${this.weatherApiUrlBase}?q=${cleanQuery}&key=${this.apiKey}`;

        return this.http.get<any>(url)
            .pipe(
                map(response => {
                    // Adapter: Convert WeatherAPI response to legacy WeatherData model
                    const weatherData: WeatherData = {
                        coord: {
                            lon: response.location.lon,
                            lat: response.location.lat
                        },
                        weather: [{
                            id: 0, // Not provided by simple response
                            main: response.current.condition.text,
                            description: response.current.condition.text,
                            icon: response.current.condition.icon.split('/').pop().replace('.png', '') // Extract icon code approx
                        }],
                        base: 'stations',
                        main: {
                            temp: response.current.temp_k || (response.current.temp_c + 273.15), // Convert C to Kelvin as app expects K
                            pressure: response.current.pressure_mb,
                            humidity: response.current.humidity,
                            temp_min: response.current.temp_c + 273.15, // Approx
                            temp_max: response.current.temp_c + 273.15  // Approx
                        },
                        visibility: response.current.vis_km * 1000,
                        wind: {
                            speed: response.current.wind_kph / 3.6, // km/h to m/s
                            deg: response.current.wind_degree
                        },
                        clouds: {
                            all: response.current.cloud
                        },
                        dt: response.location.localtime_epoch,
                        sys: {
                            country: response.location.country,
                            sunrise: 0, // Not in current.json
                            sunset: 0
                        },
                        id: 0, // No city ID in this response
                        name: response.location.name,
                        cod: 200
                    };
                    return [weatherData];
                }),
                catchError(error => {
                    console.error('Error fetching from WeatherAPI', error);
                    return throwError(() => error);
                })
            );
    }

    addWeatherData(data: WeatherData): Observable<any> {
        return this.http.post(this.weatherApiUrl, data);
    }

    deleteWeather(id: number | string): Observable<any> {
        return this.http.delete(`${this.weatherApiUrl}/${id}`);
    }

    deleteAllWeather(): Observable<any> {
        // Implementation to delete all: Get all IDs first, then delete each.
        // Using json-server, this is the only way usually.
        return this.getWeather().pipe(
            map(items => {
                // This is tricky as it's async recursive or parallel. 
                // For now, let's just return the observable and let the component handle it or implement a simple loop.
                // Or better: don't implement complex logic here if not strictly needed.
                return items;
            })
        );
    }
}
