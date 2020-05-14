import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyVideosPageRoutingModule } from './my-videos-routing.module';

import { MyVideosPage } from './my-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyVideosPageRoutingModule
  ],
  declarations: [MyVideosPage]
})
export class MyVideosPageModule {}
