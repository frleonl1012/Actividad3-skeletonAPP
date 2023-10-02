import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InicioPageRoutingModule } from './inicio-routing.module';
import { ModalPerfilComponent } from '../../components/modal-perfil/modal-perfil.component'
import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InicioPageRoutingModule, 
    
  ],
  declarations: [InicioPage, ModalPerfilComponent],
  
})
export class InicioPageModule {}
