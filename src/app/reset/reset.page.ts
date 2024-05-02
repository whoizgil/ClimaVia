import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {
  email: string = '';

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router) { }


  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.presentToast('Um email de redefinição de senha foi enviado para o seu email.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Erro ao enviar email de redefinição de senha. Verifique o email e tente novamente.');
    }
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom' 
    });
    toast.present();
  }  
}
