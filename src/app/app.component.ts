import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  botaoFecharVisivel: boolean = false;
  showMenu: boolean = true;
  username: string | null = null;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const noMenuRoutes = ['/login', '/reset', '/register', '/home'];
      this.showMenu = !noMenuRoutes.includes(event.urlAfterRedirects);
    });

    this.authService.getUserName().subscribe(name => {
      this.username = name;
    });
  }

  fecharMenu() {
    this.menuController.close('main-menu');
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      this.username = null;
      this.router.navigate(['/login']);
      this.fecharMenu();
    });
  }

  mostrarBotaoFechar() {
    this.botaoFecharVisivel = true;
  }

  ocultarBotaoFechar() {
    this.botaoFecharVisivel = false;
  }
}
