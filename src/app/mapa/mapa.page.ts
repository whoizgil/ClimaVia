import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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
  autocompleteService: any;
  placesService: any;
  originInput: HTMLInputElement | undefined;
  destinationInput: HTMLInputElement | undefined;
  routeCoordinates: any[] = [];
  markers: any[] = [];
  currentInfoWindow: google.maps.InfoWindow | null = null;

  constructor(
    private geolocation: Geolocation,
    private http: HttpClient,
    private alertController: AlertController 
) {
    (window as any).initMap = this.initMap.bind(this);
}


  ngOnInit() {
    this.loadMapScript();
    this.initMap();
  }

  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message:
        'Aqui será seu futuro guia, você poderá ver a previsão da sua localização atual e a do destino que desejar.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  loadMapScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZJF-Hp_BLZ7bj5pS7wIxmWNC_8V-GoEE&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Erro ao carregar a API do Google Maps.');
    };
    script.onload = () => {
      console.log('API do Google Maps carregada com sucesso.');
      this.checkPermissionAndInitializeMap(); // Adiciona a inicialização do mapa após o carregamento da API
    };
    document.head.appendChild(script);
  }

  async checkPermissionAndInitializeMap() {
    try {
      const geolocation = await this.geolocation.getCurrentPosition();
      const myLatLng = {
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude,
      };
      this.initMap(myLatLng); // Se a permissão for concedida, inicialize o mapa com a localização atual
    } catch (error) {
      console.error('Erro ao obter a localização atual:', error);
      this.initMap(); // Se a permissão for negada, inicialize o mapa sem coordenadas
    }
  }

  async getPlaceDetails(placeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = {
        query: placeName,
        fields: ['geometry', 'name'],
      };
      this.placesService.findPlaceFromQuery(
        request,
        (results: any[], status: any) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            resolve(results[0]);
          } else {
            reject(new Error('Local não encontrado'));
          }
        }
      );
    });
  }

  async initMap(myLatLng: { lat?: number; lng?: number } = {}) {
    try {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: myLatLng, // Use as coordenadas fornecidas ou o centro padrão do mapa
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.map);

      this.originInput = document.getElementById(
        'origin-input'
      ) as HTMLInputElement;
      this.destinationInput = document.getElementById(
        'destination-input'
      ) as HTMLInputElement;

      // Adiciona pin para o ponto de partida se as coordenadas forem fornecidas
      if (myLatLng.lat !== undefined && myLatLng.lng !== undefined) {
        const originMarker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'Ponto de Partida',
        });
        this.markers.push(originMarker);
      }

      // Adiciona pin para o ponto de destino (se definido)
      if (this.destination) {
        const destinationPlace = await this.getPlaceDetails(this.destination);
        if (destinationPlace) {
          const destinationMarker = new google.maps.Marker({
            position: destinationPlace.geometry.location,
            map: this.map,
            title: destinationPlace.name,
          });
          this.markers.push(destinationMarker);
        }
      }

      // Atualiza a rota se os pontos de partida e destino estiverem definidos
      if (this.origin && this.destination) {
        this.calculateAndDisplayRoute();
      }
    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
    }
  }

  onInputChange(type: string, event: any) {
    const input = event.target.value;

    if (input.length > 2) {
      this.autocompleteService.getPlacePredictions(
        { input },
        (predictions: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const suggestions = predictions.map(
              (prediction: any) => prediction.description
            );
            this.showSuggestions(type, suggestions);
          } else {
            console.error('Erro ao obter sugestões:', status);
          }
        }
      );
    } else {
      this.clearSuggestions(type);
    }
  }

  showSuggestions(type: string, suggestions: string[]) {
    const suggestionsContainer = document.getElementById(`${type}-suggestions`);
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
      suggestions.forEach((suggestion) => {
        const div = document.createElement('div');
        div.innerHTML = suggestion;
        div.onclick = () => {
          if (type === 'origin' && this.originInput) {
            this.originInput.value = suggestion;
            this.origin = suggestion;
          } else if (type === 'destination' && this.destinationInput) {
            this.destinationInput.value = suggestion;
            this.destination = suggestion;
          }
          this.clearSuggestions(type);
        };
        suggestionsContainer.appendChild(div);
      });
    }
  }

  clearSuggestions(type: string) {
    const suggestionsContainer = document.getElementById(`${type}-suggestions`);
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
    }
  }

  async calculateAndDisplayRoute() {
    this.weatherData = []; 
    this.clearMarkers(); 

    const request = {
      origin: this.origin,
      destination: this.destination,
      travelMode: 'DRIVING',
    };

    this.directionsService.route(request, (response: any, status: any) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        this.routeCoordinates = response.routes[0].overview_path;
        this.addPinsAlongRoute();
        this.addPinsAlongRoute(); // Chama a função para adicionar os pins
      } else {
        window.alert('Falha ao carregar a rota: ' + status);
      }
    });
  }

  clearMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  async getWeatherData(lat: number, lng: number) {
    const apiKey = '2a14f0fa6a03ab6afe2e622b509b5238'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=pt`;

    try {
      console.log(`Fetching weather data from: ${url}`);
      const response: any = await this.http.get(url).toPromise();
      if (response && response.weather && response.main && response.name) {
        return { ...response, neighborhood: response.name };
      } else {
        console.error('Erro na resposta da API do clima:', response);
        throw new Error('Erro ao obter dados do clima');
      }
    } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
      throw error;
    }
  }

  extractNeighborhood(weatherData: any): string | undefined {
    const neighborhoodName = weatherData?.name;
    return neighborhoodName;
  }

  async addPinsAlongRoute() {
    const numCoordinates = this.routeCoordinates.length;
    const step = Math.max(1, Math.floor(numCoordinates / 10)); // Limitar a 10 pins

    for (let i = 0; i < numCoordinates; i += step) {
      const coordinate = this.routeCoordinates[i];
      const weatherData = await this.getWeatherData(
        coordinate.lat(),
        coordinate.lng()
      );

      // Verifica se o bairro está destacado nas previsões do tempo
      const neighborhood = await this.getNeighborhoodName(
        coordinate.lat(),
        coordinate.lng()
      );
      if (neighborhood) {
        this.addPin(coordinate, weatherData, neighborhood);
      }

      if (this.weatherData.length >= 10) break; // Garantir que não ultrapasse 10 pins
    }
  }

  async getWeatherForecast(lat: number, lng: number): Promise<any[]> {
    const apiKey = '2a14f0fa6a03ab6afe2e622b509b5238'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=pt`;

    try {
        console.log(`Fetching weather forecast from: ${url}`);
        const response: any = await this.http.get(url).toPromise();
        if (response && response.list) {
            return response.list;
        } else {
            console.error('Error in weather forecast response:', response);
            throw new Error('Error fetching weather forecast data');
        }
    } catch (error) {
        console.error('Error fetching weather forecast data:', error);
        throw error;
    }
}

async addPin(coordinate: any, weatherData: any, neighborhoodName: string) {
    // Obter o nome exato do local
    const exactLocationName = await this.getExactLocationName(
        coordinate.lat(),
        coordinate.lng()
    );

    // Montar o conteúdo da janela de informações do pin
    const contentString = `
    <div style="font-size: 14px; text-align: center;">
        <h2 style="margin: 0; padding-bottom: 20px;">${neighborhoodName}</h2>
        <p style="margin: 0; padding-bottom: 10px; font-weight: bold;">${exactLocationName}</p>
        <div style="margin: 0; padding: 0;">
            <ion-icon name="${this.getWeatherIconName(
                weatherData.weather[0].main
            )}" style="font-size: 3em; color: ${this.getWeatherIconColor(
                weatherData.weather[0].main
            )};"></ion-icon>
        </div>
        <p style="margin: 0; padding: 0; font-size: 16px;">${this.translateWeatherDescription(
            weatherData.weather[0].description
        )}</p>
        <h3 style="margin: 0; padding: 0;">${weatherData.main.temp}°C</h3>
    </div>
    `;

    // Criar a janela de informações do pin
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
    });

    // Criar o marcador tradicional
    const marker = new google.maps.Marker({
        position: coordinate,
        map: this.map,
        title: neighborhoodName, // Título do marcador
    });

    // Adicionar evento de clique para abrir a janela de informações ao clicar no marcador
    marker.addListener('click', () => {
        // Fechar a janela de informações anterior, se existir
        if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
        }
        // Abrir a nova janela de informações
        infoWindow.open(this.map, marker);
        // Armazenar a janela de informações atual para futura referência
        this.currentInfoWindow = infoWindow;
    });

    // Adicionar o marcador à lista de marcadores
    this.markers.push(marker);

    // Adicionar as previsões das próximas 5 horas
    const forecastData = await this.getWeatherForecast(coordinate.lat(), coordinate.lng());
    const forecastContent = forecastData
        .slice(1, 6) // Pegar os próximos 5 registros
        .map((forecast: any) => `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
    <p style="margin: 0;">${new Date(forecast.dt * 1000).toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' })}</p>
    <p style="margin: 0;">${this.translateWeatherDescription(forecast.weather[0].description)}</p>
    <p style="margin: 0;">${forecast.main.temp}°C</p>
    <ion-icon name="${this.getWeatherIconName(forecast.weather[0].main)}" style="width: 20px; height: 20px; color: ${this.getWeatherIconColor(forecast.weather[0].main)};"></ion-icon>
</div>

        `)
        .join('');

    const forecastString = `
        <div style="margin-top: 20px;">
            <h4 style="margin: 0;">Próximas horas:</h4>
            ${forecastContent}
        </div>
    `;

    infoWindow.setContent(contentString + forecastString);
}



  getWeatherIcon(weatherCondition: string): string {
    let iconPath: string;

    switch (weatherCondition) {
      case 'Clear':
        iconPath = 'assets/icon/sunny.svg';
        break;
      case 'Clouds':
        iconPath = 'assets/icon/cloudy.svg';
        break;
      case 'Rain':
        iconPath = 'assets/icon/rainy.svg';
        break;
      case 'Thunderstorm':
        iconPath = 'assets/icon/thunderstorm.svg';
        break;
      case 'Snow':
        iconPath = 'assets/icon/snow.svg';
        break;
      default:
        iconPath = 'assets/icon/partly-sunny.svg';
    }

    return iconPath;
  }

  getWeatherIconName(weatherCondition: string): string {
    switch (weatherCondition) {
      case 'Clear':
        return 'sunny';
      case 'Clouds':
        return 'cloudy';
      case 'Rain':
        return 'rainy';
      case 'Thunderstorm':
        return 'thunderstorm';
      case 'Snow':
        return 'snow';
      default:
        return 'partly-sunny';
    }
  }

  getWeatherIconColor(weatherCondition: string): string {
    let color: string;

    switch (weatherCondition) {
      case 'Clear':
        color = '#FFD700'; // Amarelo
        break;
      case 'Clouds':
        color = '#A9A9A9'; // Cinza
        break;
      case 'Rain':
        color = '#4682B4'; // Azul
        break;
      case 'Thunderstorm':
        color = '#800080'; // Roxo
        break;
      case 'Snow':
        color = '#FFFFFF'; // Branco
        break;
      default:
        color = '#FFA500'; // Laranja
    }

    return color;
  }

  async getExactLocationName(lat: number, lng: number): Promise<string> {
    try {
      const response: any = await this.http
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBZJF-Hp_BLZ7bj5pS7wIxmWNC_8V-GoEE`
        )
        .toPromise();
      const results = response?.results;

      if (results && results.length > 0) {
        return results[0].formatted_address;
      } else {
        throw new Error('Local exato não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter o nome exato do local:', error);
      throw error;
    }
  }

  async getNeighborhoodName(lat: number, lng: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response: any = await this.http.get(url).toPromise();
      if (response && response.address && response.address.suburb) {
        return response.address.suburb;
      } else {
        console.error(
          'Nenhum nome de bairro encontrado na resposta do OpenStreetMap.'
        );
        return 'Bairro não encontrado';
      }
    } catch (error) {
      console.error('Erro ao obter o nome do bairro:', error);
      return 'Bairro não encontrado';
    }
  }

  async getAddressDetails(
    lat: number,
    lng: number
  ): Promise<{ neighborhood: string; address: string }> {
    try {
      const response: any = await this.http
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBZJF-Hp_BLZ7bj5pS7wIxmWNC_8V-GoEE`
        )
        .toPromise();
      const results = response?.results;

      if (results && results.length > 0) {
        const addressComponents = results[0].address_components;
        let neighborhood = '';
        let address = '';

        for (const component of addressComponents) {
          if (component.types.includes('neighborhood')) {
            neighborhood = component.long_name;
          }
          if (
            component.types.includes('route') ||
            component.types.includes('street_address')
          ) {
            address = component.long_name;
          }
        }

        return { neighborhood, address };
      } else {
        throw new Error('Bairro não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter detalhes do endereço:', error);
      throw error;
    }
  }

  translateWeatherDescription(description: string): string {
    const translations: { [key: string]: string } = {
      'clear sky': 'céu limpo',
      'few clouds': 'poucas nuvens',
      'scattered clouds': 'nuvens dispersas',
      'broken clouds': 'nuvens quebradas',
      'shower rain': 'chuvisco',
      rain: 'chuva',
      thunderstorm: 'trovoada',
      snow: 'neve',
      mist: 'névoa',
    };

    return translations[description] || description;
  }
}
