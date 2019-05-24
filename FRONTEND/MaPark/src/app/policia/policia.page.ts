import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, AlertController, ToastController, ModalController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { IParques } from '../Interfaces/iparques';
import { UserInterface } from '../Interfaces/user-interface';

declare var google;

@Component({
  selector: 'app-policia',
  templateUrl: './policia.page.html',
  styleUrls: ['./policia.page.scss'],
})
export class PoliciaPage implements OnInit {

  mapRef = null;
  coordenadasElemento: any[] = []; 

  constructor(
    private route: Router,
    private parqueservice: ServiceAPIService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  async cargarCoordenadasDeElementos() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();

    let dataa = await this.parqueservice.getCuadrantes()
        .then(async (data: any) => {
        loading.dismiss();
        if (data != null)
           {
            this.coordenadasElemento  = this.coordenadasElemento.concat(data);
            //this.coordenadasElemento = data;
            //console.log('carga carga coordenada');
            //console.log(this.coordenadasElemento);
              //this.cargarCoordenadasParaMarkers();
           } else {
            const toast = await this.toastCtrl.create({
                message: 'No existen elementos',
                duration: 3000,
                position: 'middle'
              });
            toast.present();
           }
        });
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles'
    });
    loading.present();

    const myLatLng = await this.dondEestoy();

    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
     // disableDefaultUI: true
    });

    const styledMapType = new google.maps.StyledMapType([
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      }]);

    //this.mapRef.mapTypes.set('styled_map', styledMapType);
   // this.mapRef.setMapTypeId('styled_map');

    google.maps.event.addListenerOnce(this.mapRef, 'bounds_changed', async () => {
      const g =  await this.cargarCoordenadasDeElementos();
      this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info' , 0);


      //this.AddMarker(this.coordenadasElemento.LATITUD, this.coordenadasElemento.LATITUD, 'Mi Ubicación', 'info' , 0);
      //this.coordenadasElemento = this.coordenadasElemento.map((value: any) => {
       // console.log(value.features);
       //return { lat: value.feactures};
       //console.log( value.feactures);
       //return { lat: value.feactures.LATITUD, lng: value.feactures.LONGITUD };
      //});
      console.log('resultado dce');
      console.log(this.coordenadasElemento[0].features.length);
      console.log(this.coordenadasElemento[0].features);


      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.coordenadasElemento[0].features.length; i++) {
           console.log(this.coordenadasElemento[0].feactures[i].attributes);
        //dce quedaron alrevez las posciciones por eso se envia primero x y luego y a diferencia de load map
         // this.AddMarker(this.coordenadasElemento[i].lat, this.coordenadasElemento[i].lng, 'cuadrante', 'info', 0);
        }

      // const lineSymbol = {
      //   path: google.maps.SymbolPath.CIRCLE,
      //   scale: 8,
      //   strokeColor: '#393'
      // };

      // const line = new google.maps.Polyline({
      //   path: this.coordenadasElemento,
      //   icons: [{
      //     icon: lineSymbol,
      //     offset: '100%'
      //   }],
      //   map: this.mapRef,
      //   geodesic: true,
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 1.0,
      //   strokeWeight: 2
      //   });
    //this.animateCircle(line);
    //line.setMap(this.mapRef);


      loading.dismiss();
     });

    //google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
     // this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info' , 0);
     // loading.dismiss();
    //  });

  }

  private async dondEestoy() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
        lat: rta.coords.latitude,
        lng: rta.coords.longitude
      };
    }

    private AddMarker(lat: number, lng: number, nombre: string, type: string, id: number ) {
      const iconBase = '../../assets/icon/';

      const icons = {
        parque: {
          icon: iconBase + 'parque.png'
                  },
          library: {
            icon: iconBase + 'parque.png'		},
          info: {
              icon: iconBase + 'ubicacion.png'
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

      const infowindow = new google.maps.InfoWindow({
        content: `
              <div>
                <h4>
                  My Ubicacion
                </h4>
                <a href="park-detail/">Ir al detalle</a>
              </div>
            `
        });

      marker.addListener('click', function() {
      infowindow.open(this.mapRef, marker);
      });

    }




}
