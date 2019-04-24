import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { ServiceAPIService } from '../../services/service-api.service';
import { IParques } from '../../Interfaces/iparques';
import { IElementos } from '../../Interfaces/ielementos';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  id;
  todo: FormGroup;
  _urlPost = `${environment.urlDominio}/api/geoparques/`;
  longitud: number;
  latitud: number;
  Elementos: IElementos[] = [];

  constructor(
    private routes: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private geolocation: Geolocation,
    private toastController: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    public serviceAPIService: ServiceAPIService,
    private toastCtrl: ToastController
  ) {
    this.inicializar();
  }

  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('Id');
    this.LoadElementos();

  }

  async LoadElementos() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    let dataa = await this.serviceAPIService.getElementos()
        .then(async (data: any) => {
        loading.dismiss();
        if (data!=null)
           {
              this.Elementos = data;
              //this.loadMap();
           }
           else
           {
            let toast = await this.toastCtrl.create({
                message: 'No existen elementos',
                duration: 3000,
                position: 'middle'
              });
            toast.present();
           }
        });
  }

  inicializar(): void {
    this.todo = this.formBuilder.group({
      elemento: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
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

    let dataa = await this.http.post(this._urlPost, this.todo.value, {headers: header})
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
                          //console.log(data);
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
