import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private alertController: AlertController) {}

  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      header: 'Caixa de Dúvida',
      message: 'Este é um pequeno texto explicativo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
