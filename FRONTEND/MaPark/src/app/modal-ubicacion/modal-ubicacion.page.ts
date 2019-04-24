import { CoordenadasModel } from './../modal-ubicacion/coordenadasModel';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController, NavController, ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Iinventarios } from 'src/app/Interfaces/iinventarios';




@Component({
  selector: 'app-modal-ubicacion',
  templateUrl: './modal-ubicacion.page.html',
  styleUrls: ['./modal-ubicacion.page.scss'],
})
export class ModalUbicacionPage implements OnInit {

  ubicacionForm = new FormGroup({
    coord_x: new FormControl(),
    coord_y: new FormControl(),
  });

  urlPost = `${environment.urlDominio}/api/geoinventarios/`;
  longitud: number;
  latitud: number;
  dataInventario: Iinventarios;
  coordenadas = new CoordenadasModel();

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
    private toastCtrl: ToastController,
    private modalController: ModalController,
    private navParams: NavParams,
    //private coordenadas: CoordenadasModel
  ) {
    //this.inicializar();
  }

  ngOnInit() {
    this.dataInventario = this.navParams.data.inventario;
    console.log(this.dataInventario);
  }

  inicializar() {

  }

  async guardarUbicacionElemento() {
    const loading = await this.loadCtrl.create({
      message: 'Guardando ubicacón',
      spinner: 'bubbles'
    });
    loading.present();



    this.coordenadas.inventarioId = this.dataInventario.id;
    this.coordenadas.coord_x = this.ubicacionForm.value.coord_x;
    this.coordenadas.coord_y = this.ubicacionForm.value.coord_y;

    console.log(this.coordenadas);


    let datos = await this.serviceAPIService.addElementos(this.coordenadas).then(
    async (data: any) => {
      loading.dismiss();
      if (data==null) {
        let toast = await this.toastController.create({
          message: 'Coordenadas no se almacenaron',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      } else {
        if (data === 0 || data === 400) {
          let toast = await this.toastController.create({
            message: 'Servicio no disponible',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        } else {
          let toast = await this.toastController.create({
            message: 'Coordenadas almacenadas correctamente',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.cerrarModal();
        }
      }
    } );

  }

  async cargarUbicacion() {
    this.latitud = 0;
    this.longitud = 0;

    const loading = await this.loadCtrl.create({
      message: 'Cargando ubicacón',
      spinner: 'bubbles'
    });
    loading.present();

    const myLatLng = await  this.dondEestoy().then(
      async (data: any) => {
        loading.dismiss();
        this.latitud = data.lat;
        this.longitud = data.lng;
      }
    );

   // this.latitud = myLatLng.lat;
  //  this.longitud = myLatLng.lng;

    //loading.dismiss();
  }

  private async dondEestoy() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
        lat: rta.coords.latitude,
        lng: rta.coords.longitude
          };
  }

  cerrarModal() {
    this.modalController.dismiss();
    //this.navCtrl.navigateForward('')
  }

}
