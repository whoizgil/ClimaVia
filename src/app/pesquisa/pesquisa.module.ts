import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { PesquisaPageRoutingModule } from './pesquisa-routing.module';
import { PesquisaPage } from './pesquisa.page';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule, 
    PesquisaPageRoutingModule,
    FormsModule
  ],
  declarations: [PesquisaPage]
})
export class PesquisaPageModule {}
