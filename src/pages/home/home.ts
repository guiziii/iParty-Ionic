//#region Component e Imports
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContactPage } from '../contact/contact';
import { ListaPage } from '../lista/lista';
import { AboutPage } from '../about/about';
import { Geolocation } from '@ionic-native/geolocation';

var Latitude = undefined;
var Longitude = undefined;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
//#endregion


export class HomePage 
{
  
  posts: any;
  posts2: any;
  posts3: any;
  distance:any;
  i:number;
  lat:string;
  longit:string;
  numbers = new Array(); 
  numbers2 = new Array(); 
  color: string; //color é o meu id
  color2: string; //color é o meu id
  color10: string; //color é o meu id
  color11: string; //color é o meu id
  
  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,public geolocation: Geolocation,
    public toastCtrl: ToastController)
  {
    this.color10 = navParams.get('log2');
    this.color11 = navParams.get('log3');
    if(this.color10!= undefined)
    {
      console.log(this.color10);
      console.log(this.color11);
      //change url
    }
    this.getLocation();
     
    
    //#region JSON de eventos + Maps api
    this.http.get('http://guiziii.esy.es/SelectEventJsonIonic.php').map(res => res.json()).subscribe(data =>
     {

      this.posts = data;
      for(this.i=0; this.i<data["length"]; this.i++)
      {
        this.lat = (data[this.i]["longitude_evento"]);
        this.longit = (data[this.i]["latitude_evento"]);  

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://maps.googleapis.com/maps/api/directions/json?origin="+Latitude+","+Longitude+"&destination="+this.lat+","+this.longit+"&key=AIzaSyBYBIdgYk4xikyW51BOtFMdU8c5TNc6wHs"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(contents => this.numbers.push(contents["routes"][0]["legs"][0]["distance"]["text"]))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(contents => this.numbers2.push(contents["routes"][0]["legs"][0]["duration"]["text"]))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        
      }
      console.log(this.numbers);
      this.posts2 = this.numbers;
      this.posts3 = this.numbers2;
     });
     //#endregion
 
  }

  //#region  Clique do Item e Toolbar 
  ItemClick(itemid:number,lat:string,longit:string)
  {
  
     this.goTo(itemid);       
     console.log(itemid);
  }
  ToolbarClick()
  {
    this.goToPage() ;
  }
 //#endregion 

  goToPage() {this.navCtrl.push(AboutPage);}              
 
  goTo(color){color = color || 'No Color Entered';this.navCtrl.push(ContactPage,{data: color});}

  getLocation(){
    this.geolocation.getCurrentPosition().then((res) => 
    {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      Latitude = res.coords.latitude;
      Longitude = res.coords.longitude;
      /*
      let toast = this.toastCtrl.create({
        message: location,
        duration: 3000
      });
      toast.present();
      */
      

    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }
  doRefresh(refresher)
  {
    this.getLocation();
     
    
    //#region JSON de eventos + Maps api
    this.http.get('http://guiziii.esy.es/SelectEventJsonIonic.php').map(res => res.json()).subscribe(data =>
     {

      this.posts = data;
      for(this.i=0; this.i<data["length"]; this.i++)
      {
        this.lat = (data[this.i]["longitude_evento"]);
        this.longit = (data[this.i]["latitude_evento"]);  

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://maps.googleapis.com/maps/api/directions/json?origin="+Latitude+","+Longitude+"&destination="+this.lat+","+this.longit+"&key=AIzaSyBYBIdgYk4xikyW51BOtFMdU8c5TNc6wHs"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(contents => this.numbers.push(contents["routes"][0]["legs"][0]["distance"]["text"]))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(contents => this.numbers2.push(contents["routes"][0]["legs"][0]["duration"]["text"]))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        
      }
      console.log(this.numbers);
      this.posts2 = this.numbers;
      this.posts3 = this.numbers2;
      if(refresher != 0)
      refresher.complete();
  } );

  }
}
 
    