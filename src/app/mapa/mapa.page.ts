import { Component, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps/ngx';
import { WeatherApi } from './weather.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss']
})
export class MapaPage {
  origin?: string;
  destination?: string;
  route: any;
  map?: GoogleMap;
  alertController: any;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private ngZone: NgZone,
    private weatherApi: WeatherApi
  ) { }

  ionViewDidEnter() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.origin = `${position.coords.latitude},${position.coords.longitude}`;
    }).catch((error) => {
      console.error('Erro ao obter localização:', error);
    });
  }

  async getRoute() {
    try {
      const response = await this.googleMaps.create({
        origin: this.origin,
        destination: this.destination,
        travelMode: 'driving'
      });
      this.route = response;
      this.drawRoute();
      this.getWeatherForWaypoints();
    } catch (error) {
      console.error('Erro ao obter rota:', error);
    }
  }

  drawRoute() {
    if (!this.route) return;
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: this.route.overview_path[0],
        zoom: 12
      }
    };
    this.map = this.googleMaps.create('map', mapOptions);

    const routePolyline = this.map.addPolylineSync({
      points: this.route.overview_path,
      color: '#FF0000',
      width: 2
    });
  }

  async getWeatherForWaypoints() {
    if (!this.route) return;
    const waypoints = this.route.waypoints;
    const weatherPromises: Promise<any>[] = [];

    waypoints.forEach((waypoint: any) => {
      const latLng = waypoint.location;
      weatherPromises.push(this.weatherApi.getWeather(latLng.lat, latLng.lng).toPromise());
    });

    try {
      const weatherResponses = await Promise.all(weatherPromises);
      this.ngZone.run(() => {
        waypoints.forEach((waypoint: any, index: number) => {
          waypoint.weather = weatherResponses[index].weather[0].description;
        });
      });
    } catch (error) {
      console.error('Erro ao obter previsão do tempo:', error);
    }
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
