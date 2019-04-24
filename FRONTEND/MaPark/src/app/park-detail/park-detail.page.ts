import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ServiceAPIService } from '../services/service-api.service';
import { IParques } from '../Interfaces/iparques';
import { Storage } from '@ionic/storage';

declare var google;
@Component({
  selector: 'app-park-detail',
  templateUrl: './park-detail.page.html',
  styleUrls: ['./park-detail.page.scss'],
})
export class ParkDetailPage implements OnInit {

  id;
  mapRef = null;
  parkDetail: IParques;
  errorMessage: any = '';

  constructor(
    private routes: ActivatedRoute,
    private route: Router,
    private parqueservice: ServiceAPIService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('Id');
    this.LoadPark(this.id);
  }

  async LoadPark(Id) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    let dataa = await this.parqueservice.getParquesById(Id)
        .then(async (data: any) => {
        loading.dismiss();
        if (data!=null)
           {
              this.parkDetail = data;
              this.loadMap();
           }
           else
           {
            let toast = await this.toastCtrl.create({
                message: 'No existe parque',
                duration: 3000,
                position: 'middle'
              });
            toast.present();
           }
        });
  }


  async loadMap() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();

    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
        center: {
          lat: this.parkDetail.coord_y,
          lng: this.parkDetail.coord_x
        },
        zoom: 16,
        disableDefaultUI: true
    });

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      this.AddMarker(this.parkDetail.coord_y, this.parkDetail.coord_x , this.parkDetail.nombre_Parque, 'parking');
      loading.dismiss();
      });

  }

  private AddMarker(lat: number, lng: number, nombre: string, type: string) {
    const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

    const icons = {
        parking: {
          icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
          icon: iconBase + 'library_maps.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      };

    const marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      // zoom: 8,
      map: this.mapRef,
      title: nombre,
      icon :  icons[type].icon
    });

    // marker.setMap(this.mapRef);
  }

  irTutorial() {
    this.route.navigateByUrl('tutorial/' + this.id);
  }



}
