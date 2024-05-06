import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedInfinitoPageRoutingModule } from './feed-infinito-routing.module';

import { FeedInfinitoPage } from './feed-infinito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedInfinitoPageRoutingModule
  ],
  declarations: [FeedInfinitoPage]
})
export class FeedInfinitoPageModule {}
