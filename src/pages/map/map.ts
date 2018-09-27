
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Geoposition } from '@ionic-native/geolocation';
declare var google;
var Latitude = undefined;
var Longitude = undefined;
var  Latpot;
var Longpot;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
    public lat: number = 0;
  public lng: number = 0; 
    i:number;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  posts: any;
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation,
    public toastCtrl: ToastController, public http: Http)
  {
  
     
        
  }

  

  ionViewDidLoad(){

      this.loadMap();
      this.getLocation();
      
      

  } 

  loadMap(){

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
        controls: {
            myLocationButton: true         
          }, 
        center: latLng,
        
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
      this.http.get('http://guiziii.esy.es/SelectEventJsonIonic.php').map(res => res.json()).subscribe(data =>
      {
       this.posts = data;
       for(this.i=0; this.i<data["length"]; this.i++)
       {
         Latpot = (data[this.i]["longitude_evento"]);
         Longpot=(data[this.i]["latitude_evento"]);  
         var position = new google.maps.LatLng(Latpot,Longpot );
      
        var museumMarker = new google.maps.Marker({animation: 'DROP', position: position, title: data[this.i]["nome_evento"]});
        museumMarker.setMap(this.map);
        this.addInfoWindow(museumMarker,data[this.i]["nome_evento"], Latpot,Longpot);
       }
      });
      
      
     
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((res) => 
    {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      Latitude = res.coords.latitude;
      Longitude = res.coords.longitude;
      let toast = this.toastCtrl.create({
        message: location,
        duration: 3000
      });
      toast.present();
      this.startNavigating();

    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }

  startNavigating(){

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);
      //directionsDisplay.setPanel(this.directionsPanel.nativeElement);

      directionsService.route({
          origin: ''+Latitude+', '+Longitude+'',
          destination: '-23.233432,-45.8853183',
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {

          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }

      });

  }
  startNavigating2(Lat,Long){

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    //directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
        origin: ''+Latitude+', '+Longitude+'',
        destination:''+Lat+', '+Long+'',
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(res);
        } else {
            console.warn(status);
        }

    });

}

  addInfoWindow(marker, content,Lat,Long)
  {
    let infoWindow = new google.maps.InfoWindow( 
    {
      content: content
              
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      
      infoWindow.setContent('<h1> '+ content +'</h1>' +
      '<button id="' + marker +'"  class="mapaboton" >Ir até o evento</button>');
      infoWindow.open(this.map, marker);
      
    });
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById(marker).addEventListener('click', () => 
        {
            this.loadMap();
            this.startNavigating2(Lat,Long)
        });
    });
    
  }
 
  
  
 
 

}


