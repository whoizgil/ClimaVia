import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular'; // Importe o AlertController

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage {
  cidade: string = '';
  previsaoDia: string = '';
  previsaoHorarios: any[] = [];

  constructor(
    private http: HttpClient,
    private alertController: AlertController // Adicione o AlertController
  ) {}
  limparCidade() {
    this.cidade = '';
  }

  limparPrevisao() {
    this.previsaoDia = '';
    this.previsaoHorarios = [];
  }
  pesquisarPrevisao() {
    const apiKey = '101f24aa35ff919bacf271b0b5ba274b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.previsaoDia = `Previsão para ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
      this.previsaoHorarios = [];

      if (data.hourly) {
        for (let i = 0; i < data.hourly.length; i++) {
          const hora = new Date(data.hourly[i].dt * 1000).toLocaleTimeString('pt-BR');
          const temperatura = data.hourly[i].temp;
          const descricao = data.hourly[i].weather[0].description;
          this.previsaoHorarios.push({ hora, temperatura, descricao });
        }
      }
    });
  }

  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      message: 'Aqui você pode pesquisar a previsão do tempo neste exato momento.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
