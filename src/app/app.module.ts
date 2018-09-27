import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPageModule } from '../pages/feed/feed.module';
import { HttpModule  } from '@angular/http';
import { MoovieProvider } from '../providers/moovie/moovie';
import { ListaPageModule } from '../pages/lista/lista.module';
import { ListaPage } from '../pages/lista/lista';
import { LoginPage } from '../pages/login/login';
import { PesqEventPage } from '../pages/pesq-event/pesq-event';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
 



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ListaPage,
    LoginPage,
    PesqEventPage,
    MapPage,
    TabsPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule ,
    FeedPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage, 
    HomePage,
    ListaPage,
    LoginPage, 
    PesqEventPage, 
    MapPage,
    TabsPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoovieProvider
  ]
})
export class AppModule {}
