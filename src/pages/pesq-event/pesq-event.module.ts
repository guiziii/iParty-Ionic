import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesqEventPage } from './pesq-event';

@NgModule({
  declarations: [
    PesqEventPage,
  ],
  imports: [
    IonicPageModule.forChild(PesqEventPage),
  ],
})
export class PesqEventPageModule {}
