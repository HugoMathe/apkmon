import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalevoPageRoutingModule } from './modalevo-routing.module';
import { ModalevoPage } from './modalevo.page';
import { RouterModule } from '@angular/router';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalevoPageRoutingModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ModalevoPage }]),
  ],
  declarations: [ModalevoPage]
})


export class Tab3PageModule {}