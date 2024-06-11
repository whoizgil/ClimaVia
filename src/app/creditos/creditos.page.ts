import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.page.html',
  styleUrls: ['./creditos.page.scss'],
})
export class CreditosPage implements OnInit {

  constructor(
    private alertController: AlertController 
) { }

  ngOnInit() {
  }
 
  async mostrarCaixaDuvida() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message: 'Aqui você encontrará os criadores do Projeto/Aplicativo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
