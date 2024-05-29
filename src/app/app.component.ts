import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  botaoFecharVisivel: boolean = false;

  constructor(private alertController: AlertController, private menuController: MenuController) {}

  mostrarBotaoFechar() {
    this.botaoFecharVisivel = true;
  }

  ocultarBotaoFechar() {
    this.botaoFecharVisivel = false;
  }

  fecharMenu() {
    this.menuController.close('main-menu');
  }
}
