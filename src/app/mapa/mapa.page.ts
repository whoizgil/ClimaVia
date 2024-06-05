import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular'; 
/// <reference path="globals/google.maps/index.d.ts" />
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  startPoint: string = '';
  endPoint: string = '';
  map: google.maps.Map | null = null;
  currentPosition?: Geoposition;
  googleMapsApiKey: string = 'AIzaSyBEwmpiv1iXBQQCMWtYlk_I5qjkjEArl-k';
  openWeatherApiKey: string = '101f24aa35ff919bacf271b0b5ba274b';

  constructor(
    private geolocation: Geolocation, private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Obter a posição atual do dispositivo
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.currentPosition = position;
    });
  }

  async obterRota() {
    const startPointCoords = await this.obterCoordenadas(this.startPoint);
    const endPointCoords = await this.obterCoordenadas(this.endPoint);

    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startPointCoords.lat},${startPointCoords.lng}&destination=${endPointCoords.lat},${endPointCoords.lng}&key=${this.googleMapsApiKey}`;

    this.http.get(directionsUrl).subscribe((data: any) => {
      // Aqui você pode desenhar a rota no mapa
      const route = data.routes[0];
      const path = route.overview_polyline.points;
      const decodedPath = google.maps.geometry.encoding.decodePath(path);

      // Adicione a rota ao mapa usando polilinhas
      const polyline = new google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyline.setMap(this.map);
    });
  }

  async obterCoordenadas(address: string): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    return new Promise<any>((resolve, reject) => {
      geocoder.geocode({ address: address }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === 'OK' && results) {
          resolve(results[0].geometry.location);
        } else {
          reject('Erro ao obter coordenadas');
        }
      });
    });
  }

  async obterPrevisaoTempo(latitude: number, longitude: number) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.openWeatherApiKey}&units=metric`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // Aqui você pode exibir as informações de previsão do tempo
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      console.log(`Temperatura: ${temperature}°C, Condições: ${weatherDescription}`);
    });
  }

  goBack() {
    window.history.back();
  }
  
  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message: 'Aqui será seu futuro guia, você poderá ver a previsão da sua localização atual e a do destino que desejar.',
      buttons: ['OK']
    });

    await alert.present();
  }
}