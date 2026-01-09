import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city.model';

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    cities$!: Observable<City[]>;

    // Form models
    modelCity: string = '';
    modelIcon: string = ''; // Maybe auto-fetch? Legacy allowed manual input.
    modelStatus: string = '';

    constructor(private cityService: CityService) { }

    ngOnInit(): void {
        this.initialiseState();
    }

    initialiseState() {
        this.cities$ = this.cityService.getCities();
    }

    addCity() {
        if (!this.modelCity) return;

        // In legacy, icon and status were manual.
        // Ideally we should fetch weather for valid city, but let's keep it simple first
        const newCity: City = {
            id: 0, // Server assigns ID
            city: this.modelCity,
            icon: this.modelIcon || '01d', // Default icon
            status: this.modelStatus || 'Unknown'
        };

        this.cityService.addCity(newCity).subscribe(() => {
            this.initialiseState(); // Refresh list
            this.resetForm();
        });
    }

    deleteCity(id: number) {
        this.cityService.deleteCity(id).subscribe(() => {
            this.initialiseState();
        });
    }

    resetForm() {
        this.modelCity = '';
        this.modelIcon = '';
        this.modelStatus = '';
    }
}
