import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular'; // Importe NavController

interface PrevisaoCidade {
  cidade: string;
  previsoes: any[];
  expandido: boolean;
}

@Component({
  selector: 'app-feed-infinito',
  templateUrl: './feed-infinito.page.html',
  styleUrls: ['./feed-infinito.page.scss'],
})
export class FeedInfinitoPage implements OnInit {
  previsoesCidades: PrevisaoCidade[] = [];

  constructor(private http: HttpClient, private navCtrl: NavController) {} // Injete NavController

  ngOnInit() {
    this.carregarPrevisoesParaCidades();
  }

  carregarPrevisoesParaCidades() {
    const apiKey = '101f24aa35ff919bacf271b0b5ba274b';
    const cidades = [
      'São Paulo',
      'Rio de Janeiro',
      'Salvador',
      'Brasília',
      'Fortaleza',
      'Belo Horizonte',
      'Porto Alegre',
      'Recife',
      'Curitiba',
      'Goiânia',
      'Belém',
      'Campinas',
      'São Luís',
      'São Gonçalo',
      'Maceió',
      'Duque de Caxias',
      'Nova Iguaçu',
      'Santo André',
      'Joinville',
      'Natal',
      'Campinas',
      'Campo Grande',
      'Teresina',
      'São Bernardo do Campo',
      'Osasco',
      'Cuiabá',
      'Jaboatão dos Guararapes',
      'São José dos Campos',
      'Ribeirão Preto',
      'New York',
      'Tokyo',
      'London',
      'Paris',
      'Los Angeles',
      'Berlin',
      'Mumbai',
      'Moscow',
      'Istanbul',
      'Beijing',
      'Shanghai',
      'Madrid',
      'Seoul',
      'Mexico City',
      'Toronto',
      'Sydney',
      'Bangkok',
      'Cairo',
      'Rome',
      'Buenos Aires',
      'Jakarta',
      'Lagos',
      'Lima',
      'Chicago',
      'Delhi',
      'Osaka',
      'Kolkata',
      'Manila',
    ];
    
    const previsoesPromises = [];
  
    for (const cidade of cidades) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
      const promise = this.http.get(apiUrl).toPromise();
      previsoesPromises.push(promise);
    }
  
    Promise.all(previsoesPromises).then((responses: any[]) => {
      this.previsoesCidades = responses.map((response, index) => ({
        cidade: cidades[index],
        previsoes: response.list,
        expandido: true
      }));
      console.log(this.previsoesCidades); // Adicione esta linha para verificar as informações recebidas da API
    }).catch(error => {
      console.error('Erro ao carregar previsões:', error);
    });
  }

  toggleExpansao(cidade: PrevisaoCidade) {
    cidade.expandido = !cidade.expandido;
  }

  voltarParaHome() {
    this.navCtrl.back(); // Navega de volta para a página inicial
  }
}
