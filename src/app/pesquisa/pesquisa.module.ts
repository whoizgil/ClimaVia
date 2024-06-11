import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { PesquisaPageRoutingModule } from './pesquisa-routing.module';
import { PesquisaPage } from './pesquisa.page';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@hudsontavares/agm-core';


@NgModule({
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBZJF-Hp_BLZ7bj5pS7wIxmWNC_8V-GoEE',
    libraries: ['places'] 
  }),
    CommonModule,
    IonicModule, 
    PesquisaPageRoutingModule,
    FormsModule
  ],
  declarations: [PesquisaPage]
})
export class PesquisaPageModule {}
