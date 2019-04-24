import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceAPIService } from '../services/service-api.service';
import { Storage } from '@ionic/storage';
import { UserInterface } from '../Interfaces/user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm =
  {
    Correo: String,
    Clave: String,
  };

  datosUsurio: UserInterface;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restProvider: ServiceAPIService,
    private toastController: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('userData').then(async (text: any) => {
      if (text != null) {
        this.datosUsurio = JSON.parse(text);
        console.log('login ' + this.datosUsurio);
      } else {
      this.navCtrl.navigateRoot('login');
    }
    });
  }

  async login( forma: NgForm ) {
    if (forma.valid) {
      const loading = await this.loadingController.create({
        message: 'Validando...',
        spinner: 'bubbles'
      });
      loading.present();
      this.userForm.Correo = forma.value.email;
      this.userForm.Clave = forma.value.clave;
      let dataa = await this.restProvider.login(this.userForm)
          .then(async (data: any) => {
            loading.dismiss();
            if (data == null) {
              const toast = await this.toastController.create({
                message: 'Usuario o contraseña incorrecta.',
                duration: 3000,
                position: 'middle'
              });
              toast.present();
            } else {
              if (data === 0 || data === 400) {
                const toast = await this.toastController.create({
                  message: 'Servicio no disponible en el momento',
                  duration: 3000,
                  position: 'middle'
                });
                toast.present();
              } else {
                //console.log(data);
                this.storage.set('userData', JSON.stringify(data));
                this.navCtrl.navigateRoot('home');
              }
            }
        });
    }
  }

}
