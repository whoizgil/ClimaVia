import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  botaoFecharVisivel: boolean = false;
  showMenu: boolean = true;
  username$: Observable<string | null> = of(null); 

  constructor(
    private menuController: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const noMenuRoutes = ['/login', '/reset', '/register', '/home'];
        this.showMenu = !noMenuRoutes.includes(event.urlAfterRedirects);
      }
    });

    this.authService.getUserDisplayName().subscribe(name => {
      this.username$ = of(name);
    });
  }

  fecharMenu() {
    this.menuController.close('main-menu');
  }

  logout() {
    this.authService.signOut().then(() => {
      this.username$ = of(null);
      this.router.navigate(['/login']);
      this.fecharMenu();
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
    });
  }

  mostrarBotaoFechar() {
    this.botaoFecharVisivel = true;
  }

  ocultarBotaoFechar() {
    this.botaoFecharVisivel = false;
  }
}
