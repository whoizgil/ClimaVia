import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {

  constructor(private navCtrl: NavController) { }

  enviarSenha() {
    // Redirecionar para a tela de login
    this.navCtrl.navigateBack('/login');
  }

}


