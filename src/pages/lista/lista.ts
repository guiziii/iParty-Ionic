import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage 
{
  
  private searchQuery: string = '';
  private items: any; // <- items property is now of the same type as posts
  posts: any;
  color: string; //color é o meu id
  color2: string; //color é o meu idcidade
  color3: string; //color é o meu UF
  color9: string; //color é o meu UF
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,private loadingCtrl: LoadingController) 
  {
    //#region JSON de eventos + Maps api
    this.color = navParams.get('data');
    this.color3 = navParams.get('log');

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });

    this.http.get('http://guiziii.esy.es/getcidadesIonic.php?id_estado='+this.color+'').map(res => res.json()).subscribe(data => 
    {
      this.posts = data["result"];   
      console.log(this.posts);
      
      this.initializeItems();

      // Hide the loading message
      loadingPopup.dismiss();
  });
    //#endregion
  }

  initializeItems() {
    this.items = this.posts;
  }
  
  Clickitem2(color2,color4)
  {
    
    color2 = this.color2;
    color4 = color4;
    
    this.navCtrl.setRoot(HomePage,{log2: this.color3, log3: color4}
    );
  } 


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ListaPage');
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}

