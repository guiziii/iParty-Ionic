import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ContactPage } from '../contact/contact';
import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage 
{
  posts: any;
  constructor(public navCtrl: NavController, public http: Http)
  {
    //#region JSON de eventos + Maps api
    this.http.get('http://guiziii.esy.es/get_estadoIonic.php').map(res => res.json()).subscribe(data =>
     {
        this.posts = data["result"];    
        console.log(data["result"]);      
     });
     //#endregion
  }
  
  Clickitem(color,color2)
  {
    color = color || 'No Color Entered';
    color2 = color2 || 'No Color Entered';
    this.navCtrl.push(ListaPage,{data: color, log:color2}
      
    );
    
  } 

  ClickNome(color3)
  {
    color3 = color3 || 'No Color Entered';
    this.navCtrl.push(ListaPage,    );
  } 



}

