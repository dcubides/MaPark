import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ServiceAPIService } from '../services/service-api.service';
import { IParques } from '../Interfaces/iparques';
import { Storage } from '@ionic/storage';
import { IElementos } from '../Interfaces/ielementos';
import { InventarioModel } from '../inventario/inventario/inventariomodel';
import { CoordenadasModel } from '../modal-ubicacion/coordenadasModel';

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
  Elementos: IElementos[] = [];
  Elemento: IElementos;
  Tipo: string;
  itemSelected: number;
  inventario = new InventarioModel();
  //coordenadasElemento: CoordenadasModel[] = [];
  coordenadasElemento: any[] = [];
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
    this.LoadElementos();
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

  async LoadElementos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    const dataa = await this.parqueservice.getElementos()
        .then(async (data: any) => {
        loading.dismiss();
        if (data != null) {
              this.Elementos = data;
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


  async LoadElemento(Id) {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    let dataa = await this.parqueservice.getElementosById(Id)
        .then(async (data: any) => {
        loading.dismiss();
        if (data!=null)
           {
              this.Elemento = data;
              this.Tipo =  this.Elemento.tipo;
              if (this.Elemento != null) {
                this.cargarInventarioPorElemento();
              }
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

  async cargarInventarioPorElemento() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    console.log(this.id, this.Elemento.id);

    let dataa = await this.parqueservice.getInventarioId(this.id, this.Elemento.id)
        .then(async (data: any) => {
        loading.dismiss();
        if (data!=null)
           {
              this.inventario = data;
              console.log('carga inventario');
              console.log(this.inventario);
              console.log(Object.keys(this.inventario).length);
              for (let i = 0; i < Object.keys(this.inventario).length; i++) {
                console.log(this.inventario[i].id);
                this.cargarCoordenadasDeElementos(this.inventario[i].id);
              }

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

  async cargarCoordenadasDeElementos(idInventario) {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    loading.present();
    console.log(this.inventario.id);

    let dataa = await this.parqueservice.getCoordenadaElemento(idInventario)
        .then(async (data: any) => {
        loading.dismiss();
        if (data!=null)
           {
              this.coordenadasElemento  = this.coordenadasElemento.concat(data);
              console.log('carga carga coordenada');
              console.log(this.coordenadasElemento);
              this.cargarCoordenadasParaMarkers();
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

  async cargarCoordenadasParaMarkers() {

    if (this.Elemento.tipo === 'Punto') {

      let tipo = '';

      if (this.Elemento.elemento === 'ARBOLES') {
        tipo = 'ARBOLES';
      } else if (this.Elemento.elemento === 'CANECAS DE BASURA') {
        tipo = 'CANECASDEBASURA';
      } else if (this.Elemento.elemento === 'LAMPARAS') {
        tipo = 'LAMPARAS';
      } else if (this.Elemento.elemento === 'OTRO') {
        tipo = 'OTRO';
      } else if (this.Elemento.elemento === 'PUNTOS DE INFORMACION') {
        tipo = 'PUNTOSDEINFORMACION';
      } else if (this.Elemento.elemento === 'SILLAS') {
        tipo = 'SILLAS';
      }

      for (let i = 0; i < this.coordenadasElemento.length; i++) {
        //dce quedaron alrevez las posciciones por eso se envia primero x y luego y a diferencia de load map
        this.AddMarker(this.coordenadasElemento[i].coord_x, this.coordenadasElemento[i].coord_y, 'Elemento', tipo);
        }
      this.coordenadasElemento = [];
    }

    if (this.Elemento.tipo === 'Linea') {

      this.coordenadasElemento = this.coordenadasElemento.map((value: any) => {
        return { lat: value.coord_x, lng: value.coord_y };
      });

      const lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#393'
      };

      const line = new google.maps.Polyline({
          path: this.coordenadasElemento,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          map: this.mapRef
          //geodesic: true,
          //strokeColor: '#FF0000',
          //strokeOpacity: 1.0,
          //strokeWeight: 2
          });
      this.animateCircle(line);
      //line.setMap(this.mapRef);
      console.log('pintar linea');
      this.coordenadasElemento = [];
      }

    if (this.Elemento.tipo === 'Poligono') {


       // this.coordenadasElemento = this.coordenadasElemento.map((value: any) => {
      //    return { lat: value.coord_x, lng: value.coord_y };
       // });

       const bermudaTriangle = new google.maps.Polygon({
        paths: this.coordenadasElemento.map((value: any) => {
          return { lat: value.coord_x, lng: value.coord_y };
        }),
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
       bermudaTriangle.setMap(this.mapRef);
       this.coordenadasElemento = [];
       console.log('pintar poligono');
        }


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

    const styledMapType = new google.maps.StyledMapType([
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8ec3b9'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1a3646'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibilit: 'off'
          }
        ]
      },
      {
        featureTyp: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#4b6878'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#64779e'
          }
        ]
      },
      {
        featureType: 'administrative.province',
        elementType: 'geoetry.stroke',
        stylers: [
          {
            color: '#4b6878'
          }
        ]
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#334e87'
          }
        ]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#283d6a'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6f9ba5'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#3C7680'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#304a7d'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#98a5be'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2c6675'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#255763'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#b0d5ce'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#023e58'
          }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#98a5be'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1d2c4d'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#283d6a'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#3a4762'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#0e1626'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#4e6d70'
          }
        ]
      }
    ]);

    this.mapRef.mapTypes.set('styled_map', styledMapType);
    this.mapRef.setMapTypeId('styled_map');

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      this.AddMarker(this.parkDetail.coord_y, this.parkDetail.coord_x , this.parkDetail.nombre_Parque, 'parking');
      loading.dismiss();
      });

  }

  private AddMarker(lat: number, lng: number, nombre: string, type: string) {
    const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    const iconasset = '../../assets/icon/';

    const icons = {
        parking: {
          icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
          icon: iconBase + 'library_maps.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        },
        ARBOLES: {
          icon: iconasset + 'arbol.png'
        },
        CANECASDEBASURA: {
          icon: iconasset + 'basura.png'
        },
        LAMPARAS: {
          icon: iconasset + 'lampara.png'
        },
        OTRO: {
          icon: iconasset + 'parque.png'
        },
        PUNTOSDEINFORMACION: {
          icon: iconBase + 'info-i_maps.png'
        },
        SILLAS: {
          icon: iconasset + 'silla.png'
        }
      };

    let marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      // zoom: 8,
      map: this.mapRef,
      title: nombre,
      icon :  icons[type].icon
    });

    marker.setMap(this.mapRef);
  }

  irTutorial() {
    this.route.navigateByUrl('tutorial/' + this.id);
  }

  animateCircle(line: any) {
    let n: number;
    let count = 0;
    n = setInterval( () => { count = (count + 1) % 200;
                             const icons = line.get('icons');
                             icons[0].offset = (count / 2) + '%';
                             line.set('icons', icons); }, 20) as any;

  //  setInterval(this.animation(line), 20);
}

animation(line: any): void {
  let count = 0;
  count = (count + 1) % 200;

  const icons = line.get('icons');
  icons[0].offset = (count / 2) + '%';
  line.set('icons', icons);

}



}
