import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  fullName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) {}

  async register() {

    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      await this.presentErrorToast("Por favor, preencha todos os campos.");
      return;
    }
    
    if (!this.validateEmail(this.email)) {
      await this.presentErrorToast("Por favor, insira um email válido.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentErrorToast("As senhas não coincidem");
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.presentSuccessToast("Usuário cadastrado com sucesso");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.presentErrorToast("E-mail já em uso");
      } else {
        this.presentErrorToast("Erro ao cadastrar usuário");
      }
    }
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
