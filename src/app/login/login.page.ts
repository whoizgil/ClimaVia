import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
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
      const userCredential = await this.authService.emailSignIn(this.email, this.password).toPromise();
      this.presentSuccessToast('Usuário logado com sucesso');
      this.router.navigate(['/feed-infinito']);
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      this.presentErrorToast('E-mail ou Senha inválidos');
    }
  }

  async signInWithGoogle() {
    try {
      const result = await this.authService.googleSignIn().toPromise();
      this.presentSuccessToast('Usuário logado com sucesso');
      this.router.navigate(['/feed-infinito']);
    } catch (error) {
      console.error('Erro ao fazer login com o Google', error);
      this.presentErrorToast('Erro ao fazer login com o Google');
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
