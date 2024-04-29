import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


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

  constructor(private afAuth: AngularFireAuth) {}


  async register() {
    if (this.password !== this.confirmPassword) {
      console.error("As senhas não coincidem");
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log("Usuário cadastrado com sucesso:", userCredential.user);
      // Redirecione o usuário para a página desejada após o cadastro bem-sucedido
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      // Trate o erro aqui, exibindo uma mensagem de erro para o usuário, por exemplo
    }
  }
}