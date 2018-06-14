export class WeatherData {
  constructor(
      public coord: Coord,
      public weather: Weather[],
      public base: string,
      public main: Main,
      public visibility: string,
      public wind: Wind,
      public clouds: Clouds,
      public dt: string,
      public sys: Sys,
      public id: string,
      public name: string,
      public cod: string
  ) {}
}

export class Coord {
  constructor(
      public lon: string,
      public lat: string
  ) {}
}

export class Weather {
  constructor(
    public id: string,
    public main: string,
    public description: string,
    public icon: string
  ) {}
}

export class Main {
  constructor(
    public temp: string,
    public pressure: string,
    public sea_level: string,
    public humidity: string,
    public temp_min: string,
    public temp_max: string
  ) {}
}

export class Wind {
  constructor(
    public speed: string,
    public deg: string
  ) {}
}

export class Clouds {
  constructor(
    public all: string
  ) {}
}

export class Sys {
  constructor(
    public type: string,
    public id: string,
    public message: string,
    public country: string,
    public sunrise: string,
    public sunset: string
  ) {}
}
