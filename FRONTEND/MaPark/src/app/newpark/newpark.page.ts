
import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-newpark',
  templateUrl: './newpark.page.html',
  styleUrls: ['./newpark.page.scss'],
})
export class NewparkPage implements OnInit {

   todo: FormGroup;
   urlPost = `${environment.urlDominio}/api/geoparques/`;
   longitud: number;
   latitud: number;

   constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private geolocation: Geolocation,
    private toastController: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
  ) {
    this.inicializar();
  }

  ngOnInit() {
  }

  inicializar(): void {
    this.todo = this.formBuilder.group({
      identificador_parque: new FormControl(''),
      estrato: new FormControl('', Validators.required),
      upz: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      estado_Certificacion: new FormControl('', Validators.required),
      clasificacion_Parque: new FormControl('', Validators.required),
      nombre_Parque: new FormControl('', Validators.required),
      administración_Parque: new FormControl(''),
      codigo_Localidad: new FormControl(''),
      codigo_POT: new FormControl(''),
      coord_x: new FormControl('', Validators.required),
      coord_y: new FormControl('', Validators.required)
    });
  }

  async logForm() {

    const loading = await this.loadCtrl.create({
      message: 'Guardando...',
      spinner: 'bubbles'
    });
    loading.present();


    const header = new HttpHeaders().set('Content-Type', 'application/json');

    const dataa = await this.http.post(this.urlPost, this.todo.value, {headers: header})
                    .subscribe(async (data: any) => {
                      loading.dismiss();
                      if (data == null) {
                        const toast = await this.toastController.create({
                          message: 'Datos incorrectos.',
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
                          // console.log(data);
                          const toast = await this.toastController.create({
                            message: 'Parque creado correctamente',
                            duration: 3000,
                            position: 'middle'
                          });
                          toast.present();
                          this.storage.set('ParqueCreado', JSON.stringify(data));
                          this.navCtrl.navigateRoot('home');
                        }
                      }
                  });

    console.log(dataa);
  }

  async cargarUbicacion() {
    this.latitud = 0;
    this.longitud = 0;

    const myLatLng = await  this.dondEestoy();

    this.latitud = myLatLng.lat;
    this.longitud = myLatLng.lng;
  }

  private async dondEestoy() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
        lat: rta.coords.latitude,
        lng: rta.coords.longitude
          };
  }




}
