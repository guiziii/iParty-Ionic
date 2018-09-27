import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage 
{
  
  posts: any;
  color: string; //color é o meu id
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http)
  {
    
     this.color = navParams.get('data');

     this.http.get('http://guiziii.esy.es/RetrieveEventoIonic.php?id_evento='+this.color+'').map(res => res.json()).subscribe(data =>
     {
       this.posts = data["result"];
       console.log(data["result"]);
     });
    
  }

}
