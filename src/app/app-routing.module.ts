import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pesquisa',
    loadChildren: () => import('./pesquisa/pesquisa.module').then(m => m.PesquisaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then(m => m.ResetPageModule)
  },
  {
    path: 'feed-infinito',
    loadChildren: () => import('./feed-infinito/feed-infinito.module').then(m => m.FeedInfinitoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticlePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pesquisa.page.html',  
    loadChildren: () => import('./pesquisa/pesquisa.module').then(m => m.PesquisaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'feed-infinito.page.html',
    loadChildren: () => import('./feed-infinito/feed-infinito.module').then(m => m.FeedInfinitoPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'creditos',
    loadChildren: () => import('./creditos/creditos.module').then( m => m.CreditosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
