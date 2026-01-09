import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { HttpModule } from '@angular/http';
import { CityService } from './_shared/city.service';
import { enableProdMode } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './_shared/weather.service';
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [CityService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
