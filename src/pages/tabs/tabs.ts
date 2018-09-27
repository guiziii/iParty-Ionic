import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';
import { LoginPage } from '../login/login';
import { PesqEventPage } from '../pesq-event/pesq-event';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = PesqEventPage;
  tab4Root = MapPage;
  


  constructor() {

  }
}
