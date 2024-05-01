import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) { }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    console.log("E-mail:", this.email);
    if (!this.isValidEmail(this.email)) {
      this.presentErrorToast('Por favor, insira um endereço de e-mail válido');
      return;
    }

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.presentSuccessToast('Usuário logado com sucesso');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      this.presentErrorToast('E-mail ou Senha inválidos');
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
