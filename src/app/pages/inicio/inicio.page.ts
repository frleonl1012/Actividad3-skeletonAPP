import { Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalPerfilComponent } from '../../components/modal-perfil/modal-perfil.component'
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  message: string;
  currentDate: Date;
  formularioPerfil: FormGroup;


  constructor(private appComponent: AppComponent, private storage: Storage, private router: Router, public fb:FormBuilder, public alertController: AlertController) { 
    this.currentDate = new Date();
    this.message = 'Usuario'
    this.formularioPerfil = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'nivelEducacion': new FormControl('', Validators.required),
      'fechaNacimiento': new FormControl('', Validators.required),
    })

  }
  

  ImagenLogo(): string {
    return this.appComponent.imgLogo;
  }

  async ngOnInit() {
    const value = await this.storage.get('login');
    this.message = `${value.usuario}`;
  }

  async logout(){
    await this.storage.clear();
    this.router.navigate(['/login']);
  }

  async mostrar(){
    var f = this.formularioPerfil.value;

    var perfil = {
      nombre: f.nombre,
      apellido: f.apellido,
      nivelEducacion: f.nivelEducacion,
      fechaNacimiento: f.fechaNacimiento
    }

    await this.storage.set("perfil", perfil)

    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Datos del formulario:',
      message: `Nombre: ${perfil.nombre} - Apellido: ${perfil.apellido} - Nivel Educación: ${perfil.nivelEducacion} - Fecha nacimiento: ${perfil.fechaNacimiento}`,
      buttons: ['Cerrar'],
    });

    await alert.present();

  }

  async limpiarCampos() {
    this.formularioPerfil.reset(); 
  }



}
