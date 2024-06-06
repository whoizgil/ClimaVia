import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  origin: string = ''; 
  destination: string = ''; 
  map: any;
  directionsService: any;
  directionsDisplay: any;
  weatherData: any[] = [];
  alertController: any;

  constructor(
    private geolocation: Geolocation,
    private http: HttpClient
  ) {
    // Adiciona initMap ao escopo global
    (window as any).initMap = this.initMap.bind(this);
  }

  ngOnInit() {
    this.loadMapScript();
  }

  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message: 'Aqui será seu futuro guia, você poderá ver a previsão da sua localização atual e a do destino que desejar.',
      buttons: ['OK']
    });

    await alert.present();
  }

  loadMapScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZJF-Hp_BLZ7bj5pS7wIxmWNC_8V-GoEE`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initMap();
    document.head.appendChild(script);
  }

  async initMap() {
    const geolocation = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: geolocation.coords.latitude,
      lng: geolocation.coords.longitude
    };

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
  }

  async calculateAndDisplayRoute() {
    this.weatherData = []; // Limpa os dados do tempo anteriores

    const request = {
      origin: this.origin,
      destination: this.destination,
      travelMode: 'DRIVING'
    };

    this.directionsService.route(request, (response: any, status: any) => { // Defina os tipos de response e status
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        this.getWeatherAlongRoute(response.routes[0].overview_path);
      } else {
        window.alert('Falha ao carregar a rota: ' + status);
      }
    });
  }

  async getWeatherAlongRoute(routeCoordinates: any[]) {
    const apiKey = '101f24aa35ff919bacf271b0b5ba274b';

    for (const coordinate of routeCoordinates) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat()}&lon=${coordinate.lng()}&appid=${apiKey}`;
      const response = await this.http.get(url).toPromise();

      this.weatherData.push(response);
    }
  }
}
