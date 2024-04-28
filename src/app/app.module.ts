import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule, provideFirebaseApp(() => initializeApp({"projectId":"climavia-7b803","appId":"1:321548348876:web:a82403d3991ed245010169","databaseURL":"https://climavia-7b803-default-rtdb.firebaseio.com","storageBucket":"climavia-7b803.appspot.com","apiKey":"AIzaSyBX2BtfIMLIChvUGu7A_mIe_V2IKCp-Nqg","authDomain":"climavia-7b803.firebaseapp.com","messagingSenderId":"321548348876","measurementId":"G-78WL52629Q"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
