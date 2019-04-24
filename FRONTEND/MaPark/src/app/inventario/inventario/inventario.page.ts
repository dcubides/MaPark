import { ModalUbicacionPage } from '../../modal-ubicacion/modal-ubicacion.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController, NavController, ModalController } from '@ionic/angular';
import { ServiceAPIService } from '../../services/service-api.service';
import { IParques } from '../../Interfaces/iparques';
import { IElementos } from '../../Interfaces/ielementos';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Iinventarios } from 'src/app/Interfaces/iinventarios';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  id;
  todo: FormGroup;
  urlPost = `${environment.urlDominio}/api/geoinventarios/`;
  longitud: number;
  latitud: number;
  Elementos: IElementos[] = [];
  inventario: Iinventarios[] = [];

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
    private modalController: ModalController
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
      idparque: new FormControl(),
      elemento: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
     // coord_x: new FormControl('', Validators.required),
    //  coord_y: new FormControl('', Validators.required)
    });
  }

  async logForm() {

    const loading = await this.loadCtrl.create({
      message: 'Guardando...',
      spinner: 'bubbles'
    });
    loading.present();


    const header = new HttpHeaders().set('Content-Type', 'application/json');

    let dataa = await this.http.post(this.urlPost, this.todo.value, {headers: header})
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
                          console.log(data);
                          this.inventario = data;
                          const toast = await this.toastController.create({
                            message: 'Elemento creado correctamente',
                            duration: 3000,
                            position: 'middle'
                          });
                          toast.present();
                          this.storage.set('ParqueCreado', JSON.stringify(data));
                          //this.navCtrl.navigateRoot('home');
                          this.cargarModal();
                        }
                      }
                  });

  }

  async cargarModal() {
      // Create a modal using MyModalComponent with some initial data
      const modal = await this.modalController.create({
        component: ModalUbicacionPage,
        componentProps:{
          modal: true,
          inventario: this.inventario,
        }
      });
      await modal.present();
}

}
