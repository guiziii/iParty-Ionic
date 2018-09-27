import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[MoovieProvider]
})
export class FeedPage 
{

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider) 
  {

  }

  public lista_filmes= new Array<any>();


  public nome:string = "Guilherme";

  public Soma(a:number,  b:number ): void { alert(this.nome + a + b ); }   

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad FeedPage');
    this.movieProvider.getLatestMoovies().subscribe(data=>
      {
        console.log(data);

      },error=>{console.log(error);}
      );

  }

}
