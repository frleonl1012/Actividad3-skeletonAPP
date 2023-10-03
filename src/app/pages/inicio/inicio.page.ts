import { Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import { AppComponent } from '../../app.component';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  message: string;
  currentDate: Date;
  formularioPerfil: FormGroup;
 

  constructor(private appComponent: AppComponent, private storage: Storage, private router: Router, public fb:FormBuilder, public alertController: AlertController, private animationCtrl: AnimationController, private el: ElementRef, private renderer: Renderer2) { 
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

  iniciarAnimacion() {
    const ionItems = this.el.nativeElement.querySelectorAll('ion-item');
    const animation = this.animationCtrl.create()
      .addElement(ionItems) 
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);

    animation.play();
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
    await this.iniciarAnimacion();
  }



}
