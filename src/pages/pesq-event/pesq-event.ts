import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { Http } from '@angular/http';
/**
 * Generated class for the PesqEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesq-event',
  templateUrl: 'pesq-event.html',
})
export class PesqEventPage {
  
  private posts: any; // <- I've added the private keyword 
  private searchQuery: string = '';
  private items: any; // <- items property is now of the same type as posts
  constructor(private http: Http, private loadingCtrl: LoadingController,public navCtrl: NavController) {

    // this.initializeItems(); <- you don't need this anymore

    // Show the loading message
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });

    this.http.get('http://guiziii.esy.es/SelectEventJsonIonic.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
        console.log(this.posts);
        
        this.initializeItems();

        // Hide the loading message
        loadingPopup.dismiss();
    });
  } 

  initializeItems() {
    this.items = this.posts;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nome_evento.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  ItemClick(itemid:number,lat:string,longit:string)
  {
  
     this.goTo(itemid);       
     console.log(itemid);
  }
  goTo(color){color = color || 'No Color Entered';this.navCtrl.push(ContactPage,{data: color});}


}
