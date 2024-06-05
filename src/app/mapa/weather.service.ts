import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherApi {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number) {
    const params = {
      lat,
      lon,
      units: 'etric',
      lang: 'pt_br',
      appid: '101f24aa35ff919bacf271b0b5ba274b'
    };

    return this.http.get(this.apiUrl, { params });
  }
}